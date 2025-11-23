# Karim AI Portfolio Website

A VS Code-themed portfolio website built with React, Vite, and Quarto for blogging.

## Development

Start the development server:
```bash
npm run dev
```

## Adding a New Blog Post

The blog is built using **Quarto**. Follow these steps to add a new post:

### 1. Create a New Post File
Navigate to the blog posts directory and create a new `.qmd` file:
```bash
cd blog/posts
# Create a new file, e.g., my-new-post.qmd
```

### 2. Write Your Post
Create a Quarto markdown file with YAML frontmatter:
```yaml
---
title: "Your Post Title"
author: "Your Name"
date: "2025-11-23"
categories: [category1, category2]
---

Your content here...
```

### 3. Render the Blog
From the blog directory, run Quarto to generate the HTML:
```bash
cd blog
quarto render
```

This will:
- Generate HTML files in `public/blog/`
- Update the blog index
- Create the post at `public/blog/posts/your-post-name.html`

### 4. Add to Command Palette (Optional)
To make the new post searchable in the site's command palette, edit `src/components/CommandPalette.jsx` and add an entry to the `files` array:
```javascript
{ name: 'my-new-post.html', path: 'my-new-post.html' }
```

### 5. Update Editor Routing (Optional)
If needed, update `src/components/Editor.jsx` to map the filename to the correct path in the iframe source.

## Project Structure

- `src/` - React application source code
- `blog/` - Quarto blog source files
- `public/blog/` - Generated blog HTML files
- `data/` - Data files (e.g., publications.json)

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Quarto** - Blog generation
- **Bootstrap** - Styling
- **React Icons** - VS Code icons
