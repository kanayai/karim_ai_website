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
const ORCID_API_URL = `https://pub.orcid.org/v3.0/${ORCID_ID}/works`;
const OUTPUT_FILE = path.join(__dirname, '../data/publications.json');

console.log('📚 Fetching publications from ORCID...');

https.get(ORCID_API_URL, {
    headers: {
        'Accept': 'application/json'
    }
}, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const orcidData = JSON.parse(data);
            const publications = parseOrcidData(orcidData);

            // Sort by year descending
            publications.sort((a, b) => {
                const yearA = parseInt(a.year) || 0;
                const yearB = parseInt(b.year) || 0;
                return yearB - yearA;
            });

            // Write to file
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(publications, null, 2));
            console.log(`✅ Successfully fetched ${publications.length} publications`);
            console.log(`📁 Saved to: ${OUTPUT_FILE}`);
        } catch (error) {
            console.error('❌ Error parsing ORCID data:', error.message);
            process.exit(1);
        }
    });
}).on('error', (error) => {
    console.error('❌ Error fetching from ORCID:', error.message);
    process.exit(1);
});

/**
 * Parse ORCID JSON response into our publications format
 */
function parseOrcidData(orcidData) {
    const publications = [];
    const processedDOIs = new Set(); // Track DOIs to avoid duplicates

    if (!orcidData.group) {
        console.warn('⚠️  No publication groups found in ORCID data');
        return publications;
    }

    for (const group of orcidData.group) {
        // Get the first work summary (ORCID may have duplicates)
        const workSummary = group['work-summary']?.[0];
        if (!workSummary) continue;

        const title = workSummary.title?.title?.value;
        if (!title) continue;

        // Extract DOI
        let doi = null;
        const externalIds = workSummary['external-ids']?.['external-id'] || [];
        for (const extId of externalIds) {
            if (extId['external-id-type'] === 'doi') {
                doi = extId['external-id-value'];
                break;
            }
        }

        // Skip if we've already processed this DOI
        if (doi && processedDOIs.has(doi.toLowerCase())) {
            continue;
        }
        if (doi) processedDOIs.add(doi.toLowerCase());

        // Extract year
        const year = workSummary['publication-date']?.year?.value || '';

        // Extract journal
        const journal = workSummary['journal-title']?.value || '';

        // Create link (prefer DOI)
        let link = '';
        if (doi) {
            link = `https://doi.org/${doi}`;
        }

        // For authors, ORCID API doesn't provide full author list in work-summary
        // We'll use a placeholder and note this limitation
        const authors = 'Anaya-Izquierdo, K. et al.';

        // Publication date for sorting
        let month = workSummary['publication-date']?.month?.value || '';
        let day = workSummary['publication-date']?.day?.value || '';
        let dateStr = '';
        if (month && day) {
            const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            dateStr = `${monthNames[parseInt(month)]} ${day}, ${year}`;
        } else if (month) {
            const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            dateStr = `${monthNames[parseInt(month)]} ${year}`;
        } else {
            dateStr = year;
        }

        publications.push({
            date: dateStr,
            authors: authors,
            year: year,
            title: title,
            journal: journal,
            link: link
        });
    }

    return publications;
}
