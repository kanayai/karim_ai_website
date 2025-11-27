# PhD Students Display Script
# Generates an HTML file with formatted PhD students (Magazine/Grid Layout)

library(tidyverse)
library(jsonlite)

# Read the JSON file
students <- fromJSON("data/phd_students.json")

# Convert to tibble
students_df <- students %>%
    as_tibble()

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

        h1 i { color: var(--accent-blue); }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
            gap: 30px;
        }

        .card {
            background-color: var(--card-bg);
            border-radius: 12px;
            padding: 30px;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            border: 1px solid transparent;
            position: relative;
            overflow: hidden;
            height: 100%;
        }

        .card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 4px;
            height: 100%;
            background: linear-gradient(to bottom, var(--accent-teal), var(--accent-blue));
            opacity: 0.8;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border-color: var(--border-color);
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }

        .role {
            background: rgba(0, 122, 204, 0.15);
            color: var(--accent-blue);
            padding: 4px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: bold;
        }

        .icon {
            font-size: 1.5rem;
            color: var(--text-secondary);
        }

        .name {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 10px;
            line-height: 1.3;
        }

        .thesis {
            font-size: 1.1rem;
            color: var(--accent-teal);
            margin-bottom: 15px;
            font-style: italic;
        }

        .description {
            color: var(--text-secondary);
            font-size: 0.95rem;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .details {
            margin-bottom: 20px;
            font-size: 0.95rem;
            flex-grow: 1;
        }

        .detail-row {
            display: flex;
            gap: 10px;
            margin-bottom: 8px;
            align-items: baseline;
        }

        .detail-row i {
            color: var(--accent-orange);
            width: 20px;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 25px;
        }

        .tag {
            font-size: 0.8rem;
            padding: 4px 10px;
            border-radius: 12px;
            background-color: rgba(255, 255, 255, 0.05);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
        }

        .footer {
            margin-top: auto;
            border-top: 1px solid var(--border-color);
            padding-top: 20px;
        }

        .btn-view {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background-color: var(--accent-teal);
            color: #1e1e1e;
            padding: 10px 20px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background 0.2s;
        }

        .btn-view:hover {
            background-color: #3ac1a0;
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            body { padding: 20px; }
        }
    </style>
    <script>
        (function() {
            const params = new URLSearchParams(window.location.search);
            const theme = params.get("theme");
            if (theme === "light") {
                document.documentElement.style.setProperty("--bg-color", "#ffffff");
                document.documentElement.style.setProperty("--card-bg", "#ffffff");
                document.documentElement.style.setProperty("--text-primary", "#000000");
                document.documentElement.style.setProperty("--text-secondary", "#555555");
                document.documentElement.style.setProperty("--border-color", "#e4e4e4");
                document.documentElement.style.setProperty("--hover-bg", "#f3f3f3");
                document.documentElement.style.setProperty("--accent-blue", "#005a9e");
                document.documentElement.style.setProperty("--accent-teal", "#007060");
            }
        })();
    </script>
</head>
<body>
    <div class="container">
        <h1><i class="fas fa-user-graduate"></i> PhD Students</h1>

        <div class="grid">
')

# Add cards
for (i in seq_len(nrow(students_df))) {
    student <- students_df[i, ]

    # Generate tags HTML
    tags_html <- ""
    for (tag in unlist(student$tags)) {
        tags_html <- paste0(tags_html, '<span class="tag">', tag, "</span>")
    }

    html_content <- paste0(html_content, '
            <div class="card">
                <div class="header">
                    <span class="role">PhD Student</span>
                    <i class="fas fa-graduation-cap icon"></i>
                </div>
                <div class="name">', student$name, '</div>
                <div class="thesis">"', student$thesis, '"</div>

                <div class="description">', student$description, '</div>

                <div class="details">
                    <div class="detail-row">
                        <i class="fas fa-university"></i>
                        <span>', student$department, '</span>
                    </div>
                    <div class="detail-row">
                        <i class="fas fa-chalkboard-teacher"></i>
                        <span>Supervisors: ', student$supervisors, '</span>
                    </div>
                </div>

                <div class="tags">
                    ', tags_html, '
                </div>
                <div class="footer">
                    <a href="', student$link, '" target="_blank" class="btn-view">
                        View Thesis <i class="fas fa-external-link-alt"></i>
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
writeLines(html_content, "public/phd_students.html")

cat("✅ PhD Students HTML generated at public/phd_students.html\n")
