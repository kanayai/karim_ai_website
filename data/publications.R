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
    <style>
        body {
            font-family: "JetBrains Mono", monospace;
            background-color: #1e1e1e;
            color: #d4d4d4;
            padding: 40px;
            line-height: 1.6;
        }
        h1 {
            color: #ffffff;
            border-bottom: 2px solid #007acc;
            padding-bottom: 10px;
        }
        h2 {
            color: #4ec9b0;
            margin-top: 30px;
        }
        .publication {
            margin-bottom: 25px;
            padding: 15px;
            background-color: #252526;
            border-left: 3px solid #007acc;
            border-radius: 4px;
        }
        .title {
            font-size: 1.1em;
            font-weight: bold;
            color: #ffffff;
            margin-bottom: 8px;
        }
        .authors {
            color: #9cdcfe;
            margin-bottom: 5px;
        }
        .journal {
            color: #ce9178;
            font-style: italic;
            margin-bottom: 8px;
        }
        a {
            color: #3794ff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>📚 Publications</h1>
')

# Group by year and add to HTML
for (yr in unique(pubs_df$year)) {
  year_pubs <- pubs_df %>% filter(year == yr)

  html_content <- paste0(html_content, "
    <h2>", yr, "</h2>
  ")

  for (i in 1:nrow(year_pubs)) {
    pub <- year_pubs[i, ]
    html_content <- paste0(html_content, '
    <div class="publication">
        <div class="title">', pub$title, '</div>
        <div class="authors">', pub$authors, '</div>
        <div class="journal">', pub$journal, '</div>
        <a href="', pub$link, '" target="_blank">🔗 View Publication</a>
    </div>
    ')
  }
}

html_content <- paste0(html_content, "
</body>
</html>
")

# Write to public directory
writeLines(html_content, "public/publications.html")

cat("✅ Publications HTML generated at public/publications.html\n")
