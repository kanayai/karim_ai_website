# Projects Display Script
# Generates public/projects.html from data/projects.json.

library(tidyverse)
library(jsonlite)

projects_df <- fromJSON("data/projects.json") %>%
    as_tibble() %>%
    mutate(
        status = coalesce(status, if_else(year == "Current", "Active", "Completed")),
        status_order = if_else(status == "Active", 1L, 2L)
    ) %>%
    arrange(status_order, title)

escape_html <- function(x) {
    x <- ifelse(is.na(x), "", x)
    x <- gsub("&", "&amp;", x, fixed = TRUE)
    x <- gsub("<", "&lt;", x, fixed = TRUE)
    x <- gsub(">", "&gt;", x, fixed = TRUE)
    x <- gsub('"', "&quot;", x, fixed = TRUE)
    x
}

project_card <- function(project) {
    tags_html <- project[["tags"]][[1]] %>%
        map_chr(~ paste0('<span class="tag">', escape_html(.x), '</span>')) %>%
        paste(collapse = "")

    status_class <- if_else(project[["status"]] == "Active", "active", "completed")

    paste0(
        '<article class="project-card ', status_class, '">',
        '<div class="project-header">',
        '<div>',
        '<span class="project-status">', escape_html(project[["status"]]), '</span>',
        '<span class="project-role">', escape_html(project[["role"]]), '</span>',
        '</div>',
        '<i class="fas fa-project-diagram project-icon"></i>',
        '</div>',
        '<h2 class="project-title">', escape_html(project[["title"]]), '</h2>',
        '<p class="project-desc">', escape_html(project[["description"]]), '</p>',
        '<div class="tags">', tags_html, '</div>',
        '<div class="project-footer">',
        '<a href="', escape_html(project[["link"]]), '" target="_blank" rel="noreferrer" class="btn-view">',
        'Visit Project Website <i class="fas fa-external-link-alt"></i>',
        '</a>',
        '</div>',
        '</article>'
    )
}

section_html <- function(status, title, description) {
    section_projects <- projects_df %>% filter(.data$status == .env$status)
    cards <- map_chr(seq_len(nrow(section_projects)), ~ project_card(section_projects[.x, ])) %>%
        paste(collapse = "\n")

    paste0(
        '<section class="project-section">',
        '<div class="section-heading">',
        '<div>',
        '<p class="section-kicker">', escape_html(status), '</p>',
        '<h2>', escape_html(title), '</h2>',
        '</div>',
        '<p>', escape_html(description), '</p>',
        '</div>',
        '<div class="projects-grid">', cards, '</div>',
        '</section>'
    )
}

html_content <- paste0(
'<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Research Projects - Karim Anaya-Izquierdo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-color: #0d1117;
            --card-bg: #161b22;
            --text-primary: #f0f6fc;
            --text-secondary: #8b949e;
            --accent-blue: #58a6ff;
            --accent-teal: #56d364;
            --accent-muted: #d29922;
            --border-color: #30363d;
            --hover-bg: #21262d;
        }

        body {
            margin: 0;
            padding: 32px;
            background: var(--bg-color);
            color: var(--text-secondary);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.55;
        }

        .container {
            max-width: 1120px;
            margin: 0 auto;
        }

        .page-title {
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 0 0 24px;
            padding-bottom: 18px;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-primary);
            font-size: 2.2rem;
            font-weight: 600;
        }

        .page-title i {
            color: var(--accent-blue);
        }

        .project-section + .project-section {
            margin-top: 34px;
        }

        .section-heading {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 20px;
            margin-bottom: 14px;
        }

        .section-heading h2 {
            margin: 0;
            color: var(--text-primary);
            font-size: 1.25rem;
        }

        .section-heading p {
            margin: 0;
            max-width: 520px;
            font-size: 0.92rem;
        }

        .section-kicker {
            margin: 0 0 4px !important;
            color: var(--accent-blue);
            font-size: 0.76rem !important;
            font-weight: 700;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 430px), 1fr));
            gap: 18px;
        }

        .project-card {
            position: relative;
            display: flex;
            flex-direction: column;
            min-width: 0;
            padding: 22px 22px 20px;
            overflow: hidden;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background-color: var(--card-bg);
        }

        .project-card::before {
            content: "";
            position: absolute;
            inset: 0 auto 0 0;
            width: 4px;
            background: var(--accent-blue);
        }

        .project-card.completed::before {
            background: var(--accent-muted);
        }

        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 14px;
        }

        .project-header > div {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            min-width: 0;
        }

        .project-status,
        .project-role {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 0 10px;
            border-radius: 999px;
            font-size: 0.8rem;
            font-weight: 700;
        }

        .project-status {
            background: rgba(88, 166, 255, 0.13);
            color: var(--accent-blue);
            border: 1px solid rgba(88, 166, 255, 0.28);
        }

        .project-card.completed .project-status {
            background: rgba(210, 153, 34, 0.13);
            color: var(--accent-muted);
            border-color: rgba(210, 153, 34, 0.34);
        }

        .project-role {
            background: rgba(86, 211, 100, 0.11);
            color: var(--accent-teal);
            border: 1px solid rgba(86, 211, 100, 0.24);
        }

        .project-icon {
            flex-shrink: 0;
            color: var(--text-secondary);
            font-size: 1.2rem;
        }

        .project-title {
            margin: 0 0 10px;
            color: var(--text-primary);
            font-size: 1.35rem;
            line-height: 1.28;
        }

        .project-desc {
            margin: 0 0 18px;
            color: var(--text-secondary);
            font-size: 0.98rem;
            flex-grow: 1;
        }

        .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 18px;
        }

        .tag {
            display: inline-flex;
            align-items: center;
            min-height: 28px;
            padding: 0 9px;
            border-radius: 999px;
            background-color: rgba(255, 255, 255, 0.04);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
            font-size: 0.78rem;
        }

        .project-footer {
            margin-top: auto;
            padding-top: 16px;
            border-top: 1px solid var(--border-color);
        }

        .btn-view {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 42px;
            padding: 0 16px;
            border-radius: 6px;
            background-color: var(--accent-blue);
            color: white;
            text-decoration: none;
            font-weight: 600;
        }

        .btn-view:hover {
            background-color: #1f6feb;
        }

        @media (max-width: 768px) {
            body {
                padding: 18px 14px 24px;
            }

            .page-title {
                font-size: 1.65rem;
                margin-bottom: 20px;
            }

            .section-heading {
                display: block;
            }

            .section-heading p {
                margin-top: 6px;
            }

            .projects-grid {
                grid-template-columns: 1fr;
            }

            .project-card {
                padding: 18px 16px 16px;
            }

            .btn-view {
                width: 100%;
                min-height: 46px;
            }
        }
    </style>
    <script>
        (function () {
            const theme = new URLSearchParams(window.location.search).get("theme");
            if (theme === "light" || theme === "github-light" || theme === "solarized-light") {
                document.documentElement.style.setProperty("--bg-color", "#ffffff");
                document.documentElement.style.setProperty("--card-bg", "#ffffff");
                document.documentElement.style.setProperty("--text-primary", "#24292f");
                document.documentElement.style.setProperty("--text-secondary", "#57606a");
                document.documentElement.style.setProperty("--border-color", "#d0d7de");
                document.documentElement.style.setProperty("--hover-bg", "#f6f8fa");
                document.documentElement.style.setProperty("--accent-blue", "#0969da");
                document.documentElement.style.setProperty("--accent-teal", "#1a7f37");
            }
        })();
    </script>
</head>
<body>
    <main class="container">
        <h1 class="page-title"><i class="fas fa-flask"></i> Research Projects</h1>',
section_html("Active", "Active Project", "Current research partnership and live collaboration."),
section_html("Completed", "Completed Project", "Finished project retained for record and external reference."),
'    </main>
</body>
</html>'
)

writeLines(html_content, "public/projects.html")
cat("Projects HTML generated at public/projects.html\n")
