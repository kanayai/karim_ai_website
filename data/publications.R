# Publications Display Script
# Generates an HTML file with formatted publications

library(tidyverse)
library(jsonlite)

# Read the publications JSON file
publications <- fromJSON("data/publications.json")

# Convert to tibble and arrange by year (descending)
pubs_df <- publications %>%
    as_tibble() %>%
    arrange(desc(as.numeric(year)))

# Generate HTML content
html_content <- paste0('
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #1e1e1e;
            --card-bg: #252526;
            --text-primary: #ffffff;
            --text-secondary: #cccccc;
            --accent-blue: #007acc;
            --accent-teal: #4ec9b0;
            --accent-orange: #ce9178;
            --accent-yellow: #dcdcaa;
            --border-color: #3e3e42;
            --hover-bg: #2d2d30;
        }

        body {
            font-family: "Segoe UI", "Roboto", "Helvetica Neue", sans-serif;
            background-color: var(--bg-color);
            color: var(--text-secondary);
            margin: 0;
            padding: 40px;
            line-height: 1.6;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        h1 {
            color: var(--text-primary);
            font-size: 2.5rem;
            margin-bottom: 40px;
            font-weight: 300;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        h1 i {
            color: var(--accent-blue);
        }

        .year-section {
            margin-bottom: 50px;
            position: relative;
        }

        .year-header {
            color: var(--accent-teal);
            font-size: 1.8rem;
            margin-bottom: 20px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .year-header::after {
            content: "";
            flex-grow: 1;
            height: 1px;
            background: linear-gradient(to right, var(--border-color), transparent);
            margin-left: 15px;
        }

        .publication-card {
            background-color: var(--card-bg);
            border-radius: 8px;
            padding: 25px;
            margin-bottom: 20px;
            position: relative;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid transparent;
            border-left: 4px solid var(--accent-blue);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .publication-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            background-color: var(--hover-bg);
            border-color: var(--border-color);
        }

        .pub-type-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 1.2rem;
            color: var(--border-color);
            transition: color 0.3s;
        }

        .publication-card:hover .pub-type-icon {
            color: var(--accent-blue);
        }

        .title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 10px;
            padding-right: 30px;
            line-height: 1.4;
        }

        .authors {
            color: var(--accent-blue);
            margin-bottom: 8px;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .journal {
            color: var(--accent-orange);
            font-style: italic;
            margin-bottom: 15px;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .meta-tags {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }

        .tag {
            font-size: 0.8rem;
            padding: 4px 10px;
            border-radius: 12px;
            background-color: rgba(255, 255, 255, 0.05);
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .btn-doi {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background-color: rgba(0, 122, 204, 0.1);
            color: var(--accent-blue);
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.2s;
            margin-top: 10px;
            border: 1px solid rgba(0, 122, 204, 0.2);
        }

        .btn-doi:hover {
            background-color: var(--accent-blue);
            color: white;
            text-decoration: none;
        }

        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 10px;
        }
        ::-webkit-scrollbar-track {
            background: var(--bg-color);
        }
        ::-webkit-scrollbar-thumb {
            background: #424242;
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #4f4f4f;
        }

        @media (max-width: 768px) {
            body { padding: 20px; }
            h1 { font-size: 2rem; }
            .publication-card { padding: 20px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1><i class="fas fa-book-open"></i> Research Publications</h1>
')

# Group by year and add to HTML
for (yr in unique(pubs_df$year)) {
    year_pubs <- pubs_df %>% filter(year == yr)

    html_content <- paste0(html_content, "
    <div class='year-section'>
        <div class='year-header'>", yr, "</div>
  ")

    for (i in seq_len(nrow(year_pubs))) {
        pub <- year_pubs[i, ]

        # Determine icon based on journal name (simple heuristic)
        icon_class <- "fas fa-file-alt" # Default
        if (grepl("Conference|Proceedings", pub$journal, ignore.case = TRUE)) {
            icon_class <- "fas fa-users"
        } else if (grepl("Thesis", pub$journal, ignore.case = TRUE)) {
            icon_class <- "fas fa-graduation-cap"
        }

        html_content <- paste0(html_content, '
        <div class="publication-card">
            <i class="', icon_class, ' pub-type-icon"></i>
            <div class="title">', pub$title, '</div>
            <div class="authors"><i class="fas fa-user-friends"></i> ', pub$authors, '</div>
            <div class="journal"><i class="fas fa-book"></i> ', pub$journal, '</div>

            <div class="meta-tags">
                <span class="tag"><i class="far fa-calendar-alt"></i> ', pub$year, '</span>
            </div>

            <a href="', pub$link, '" target="_blank" class="btn-doi">
                <i class="fas fa-external-link-alt"></i> View Publication
            </a>
        </div>
    ')
    }

    html_content <- paste0(html_content, "
    </div>
  ")
}

html_content <- paste0(html_content, "
    </div>
</body>
</html>
")

# Write to public directory
writeLines(html_content, "public/publications.html")

cat("✅ Publications HTML generated at public/publications.html\n")
