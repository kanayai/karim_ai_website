# Quarto Blog Workflow

This guide explains how to add new blog posts to the website using Quarto.

## 1. Create a New Post

1.  Navigate to the `blog/posts/` directory.
2.  Create a new `.qmd` file (e.g., `my-new-post.qmd`).
3.  Add the required YAML frontmatter at the top of the file:

```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "A brief summary of your post."
categories: ["tag1", "tag2"]
---
```

4.  Write your content using Markdown. You can also include code blocks (Python, R, Mermaid diagrams, etc.).

## 2. Render the Blog

After creating or editing a post, you need to render the blog to generate the HTML files.

### Option A: Using the NPM Script (Recommended)

Run the following command in your terminal:

```bash
npm run build-blog
```

This command will render the entire blog directory and output the HTML files to `public/blog/`.

### Option B: Using Quarto CLI Directly

You can also run the Quarto command directly:

```bash
quarto render blog
```

## 3. Verify

1.  Start the development server: `npm run dev`
2.  Open the website and navigate to the Blog section.
3.  Your new post should appear in the list.

## 4. Troubleshooting

-   **Missing Post**: If your post doesn't appear, ensure the `date` in the frontmatter is correct and that you have re-rendered the blog.
-   **Styling Issues**: The blog uses a custom VS Code theme override. If styles look wrong, check `src/components/Editor.jsx` where the styles are injected into the iframe.
