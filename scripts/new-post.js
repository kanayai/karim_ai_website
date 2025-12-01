const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const POSTS_DIR = path.join(__dirname, '../blog/posts');

// Ensure posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
    console.error(`Error: Posts directory not found at ${POSTS_DIR}`);
    process.exit(1);
}

const askQuestion = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

const createPost = async () => {
    console.log('\n📝 Create New Blog Post\n');

    const title = await askQuestion('Title: ');
    if (!title) {
        console.error('Title is required!');
        rl.close();
        return;
    }

    const tagsInput = await askQuestion('Tags (comma separated, e.g. "git, workflow"): ');
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t).map(t => `"${t}"`).join(', ');

    // Generate filename from title (kebab-case)
    const filename = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '.qmd';

    const filepath = path.join(POSTS_DIR, filename);

    if (fs.existsSync(filepath)) {
        console.error(`\nError: File "${filename}" already exists!`);
        rl.close();
        return;
    }

    const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const content = `---
title: "${title}"
date: "${date}"
categories: [${tags}]
---

<!-- Paste your HTML or write Markdown below this line -->

`;

    fs.writeFileSync(filepath, content);

    console.log(`\n✅ Created: ${filepath}`);
    console.log(`\nNow open this file and paste your content!`);

    rl.close();
};

createPost();
