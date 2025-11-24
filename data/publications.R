# Publications Display Script
# Generates an HTML file with formatted publications (Option 3: Magazine/Grid Layout)

library(tidyverse)
library(jsonlite)

# Read the publications JSON file
publications <- fromJSON("data/publications.json")

# Convert to tibble and arrange by year (descending)
pubs_df <- publications %>%
    as_tibble() %>%
    arrange(desc(as.numeric(year)))

# Calculate stats
total_pubs <- nrow(pubs_df)
years <- as.numeric(pubs_df$year)
year_range <- paste0(min(years), "-", max(years))
journals <- unique(pubs_df$journal)
journal_count <- length(journals)

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
            --border-color: #3e3e42;
            --hover-bg: #2d2d30;
            --input-bg: #3c3c3c;
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
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Header & Stats */
        .header-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 40px;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 20px;
            flex-wrap: wrap;
            gap: 20px;
        }

        h1 {
            color: var(--text-primary);
            font-size: 2.5rem;
            margin: 0;
            font-weight: 300;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        h1 i { color: var(--accent-blue); }

        .stats-bar {
            display: flex;
            gap: 20px;
        }

        .stat-item {
            text-align: center;
            background: rgba(255,255,255,0.05);
            padding: 10px 20px;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .stat-value {
            display: block;
            font-size: 1.2rem;
            font-weight: bold;
            color: var(--accent-teal);
        }

        .stat-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        /* Controls */
        .controls-section {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .search-box {
            flex-grow: 1;
            position: relative;
            min-width: 250px;
        }

        .search-box input {
            width: 100%;
            padding: 12px 40px 12px 15px;
            background-color: var(--input-bg);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            color: var(--text-primary);
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }

        .search-box input:focus {
            border-color: var(--accent-blue);
        }

        .search-box i {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-secondary);
        }

        .filter-chips {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 5px;
        }

        .chip {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 8px 16px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .chip:hover, .chip.active {
            background: var(--accent-blue);
            color: white;
            border-color: var(--accent-blue);
        }

        /* Grid Layout */
        .publications-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
        }

        .pub-card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            position: relative;
            overflow: hidden;
        }

        .pub-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--accent-blue), var(--accent-teal));
            opacity: 0;
            transition: opacity 0.3s;
        }

        .pub-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border-color: var(--border-color);
        }

        .pub-card:hover::before {
            opacity: 1;
        }

        .pub-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }

        .pub-year {
            background: rgba(0, 122, 204, 0.15);
            color: var(--accent-blue);
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: bold;
        }

        .pub-type {
            color: var(--text-secondary);
            font-size: 1.2rem;
        }

        .pub-title {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 15px;
            line-height: 1.4;
            flex-grow: 1;
        }

        .pub-meta {
            margin-bottom: 20px;
            font-size: 0.9rem;
        }

        .pub-authors {
            color: var(--accent-teal);
            margin-bottom: 5px;
            line-height: 1.4;
        }

        .pub-authors i {
            margin-right: 8px;
            color: var(--accent-blue);
        }

        .pub-journal {
            color: var(--accent-orange);
            font-style: italic;
        }

        .pub-footer {
            margin-top: auto;
            border-top: 1px solid var(--border-color);
            padding-top: 15px;
            display: flex;
            justify-content: flex-end;
        }

        .btn-view {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: color 0.2s;
        }

        .btn-view:hover {
            color: var(--accent-blue);
        }

        .no-results {
            grid-column: 1 / -1;
            text-align: center;
            padding: 40px;
            color: var(--text-secondary);
            font-size: 1.2rem;
            display: none;
        }

        @media (max-width: 768px) {
            .publications-grid {
                grid-template-columns: 1fr;
            }
            .header-section {
                flex-direction: column;
                align-items: flex-start;
            }
            .stats-bar {
                width: 100%;
                justify-content: space-between;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header-section">
            <h1><i class="fas fa-layer-group"></i> Publications</h1>
            <div class="stats-bar">
                <div class="stat-item">
                    <span class="stat-value">', total_pubs, '</span>
                    <span class="stat-label">Total</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">', year_range, '</span>
                    <span class="stat-label">Years</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">', journal_count, '</span>
                    <span class="stat-label">Journals</span>
                </div>
            </div>
        </div>

        <!-- Grid -->
        <div class="publications-grid" id="pubGrid">
')

# Add cards
for (i in seq_len(nrow(pubs_df))) {
    pub <- pubs_df[i, ]

    # Icon logic
    icon_class <- "fas fa-file-alt"
    if (grepl("Conference|Proceedings", pub$journal, ignore.case = TRUE)) {
        icon_class <- "fas fa-users"
    } else if (grepl("Thesis", pub$journal, ignore.case = TRUE)) {
        icon_class <- "fas fa-graduation-cap"
    }

    html_content <- paste0(html_content, '
            <div class="pub-card">
                <div class="pub-header">
                    <span class="pub-year">', pub$year, '</span>
                    <i class="', icon_class, ' pub-type"></i>
                </div>
                <div class="pub-title">', pub$title, '</div>
                <div class="pub-meta">
                    <div class="pub-authors"><i class="fas fa-user-circle"></i> ', pub$authors, '</div>
                    <div class="pub-journal">', pub$journal, '</div>
                </div>
                <div class="pub-footer">
                    <a href="', pub$link, '" target="_blank" class="btn-view">
                        Read Paper <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
  ')
}

html_content <- paste0(html_content, "
        </div>
    </div>
</body>
</html>
")

# Write to public directory
writeLines(html_content, "public/publications.html")

cat("✅ Publications HTML generated (Option 3) at public/publications.html\n")
