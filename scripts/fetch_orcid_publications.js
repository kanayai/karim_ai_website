#!/usr/bin/env node

/**
 * Fetch publications from ORCID public API
 * No authentication required for public data
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORCID_ID = '0000-0001-9718-5256';
const ORCID_API_BASE = 'https://pub.orcid.org/v3.0';
const OUTPUT_FILE = path.join(__dirname, '../data/publications.json');

console.log('📚 Fetching publications from ORCID...');

// Helper to fetch JSON
function fetchJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, {
            headers: { 'Accept': 'application/json' }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
}

async function main() {
    try {
        // 1. Fetch list of works (summaries)
        const worksUrl = `${ORCID_API_BASE}/${ORCID_ID}/works`;
        console.log(`   GET ${worksUrl}`);
        const orcidData = await fetchJson(worksUrl);

        if (!orcidData.group) {
            console.warn('⚠️  No publication groups found');
            return;
        }

        const publications = [];
        const processedDOIs = new Set();

        // Flatten the groups to get a list of work summaries to process
        const workItems = [];
        for (const group of orcidData.group) {
            const workSummary = group['work-summary']?.[0];
            if (workSummary) workItems.push(workSummary);
        }

        console.log(`   Found ${workItems.length} works. Fetching full details...`);

        // 2. Process each work (sequentially to be polite to API)
        for (const workSummary of workItems) {
            const title = workSummary.title?.title?.value;
            if (!title) continue;

            // Extract DOI from summary first
            let doi = null;
            const externalIds = workSummary['external-ids']?.['external-id'] || [];
            for (const extId of externalIds) {
                if (extId['external-id-type'] === 'doi') {
                    doi = extId['external-id-value'];
                    break;
                }
            }

            // Skip duplicates
            if (doi && processedDOIs.has(doi.toLowerCase())) continue;
            if (doi) processedDOIs.add(doi.toLowerCase());

            // Fetch full details to get authors
            const workPath = workSummary.path;
            let authors = 'Anaya-Izquierdo, K. et al.'; // Fallback

            if (workPath) {
                try {
                    const fullWorkUrl = `${ORCID_API_BASE}${workPath}`;
                    // console.log(`   Fetching details: ${title.substring(0, 30)}...`);
                    const fullWork = await fetchJson(fullWorkUrl);

                    const contributors = fullWork.contributors?.contributor || [];
                    const authorNames = contributors
                        .filter(c => c['contributor-attributes']?.['contributor-role'] === 'author')
                        .map(c => c['credit-name']?.value)
                        .filter(n => n); // Filter nulls

                    if (authorNames.length > 0) {
                        authors = authorNames.join(', ');
                    }
                } catch (err) {
                    console.warn(`   ⚠️ Failed to fetch details for ${workPath}: ${err.message}`);
                }
            }

            // Extract other fields
            const year = workSummary['publication-date']?.year?.value || '';
            const journal = workSummary['journal-title']?.value || '';

            let link = '';
            if (doi) link = `https://doi.org/${doi}`;

            // Date string
            let month = workSummary['publication-date']?.month?.value || '';
            let day = workSummary['publication-date']?.day?.value || '';
            let dateStr = year;
            if (month) {
                const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                dateStr = `${monthNames[parseInt(month)]} ${year}`;
            }

            publications.push({
                date: dateStr,
                authors: authors,
                year: year,
                title: title,
                journal: journal,
                link: link
            });

            // Small delay to be polite
            await new Promise(r => setTimeout(r, 100));
        }

        // Sort by year descending
        publications.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));

        // Write to file
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(publications, null, 2));
        console.log(`✅ Successfully fetched ${publications.length} publications with full author lists`);
        console.log(`📁 Saved to: ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

main();
