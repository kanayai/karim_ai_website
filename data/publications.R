library(tidyverse)
library(jsonlite)

publications_df <- fromJSON("data/publications.json")

publications_df <- publications_df %>%
    mutate(
        year = as.character(year),
        link = coalesce(link, ""),
        journal = coalesce(journal, "")
    ) %>%
    select(year, date, title, authors, journal, link) %>%
    arrange(desc(year)) %>%
    as_tibble()

escape_html <- function(x) {
    x <- ifelse(is.na(x), "", x)
    x <- gsub("&", "&amp;", x, fixed = TRUE)
    x <- gsub("<", "&lt;", x, fixed = TRUE)
    x <- gsub(">", "&gt;", x, fixed = TRUE)
    x <- gsub('"', "&quot;", x, fixed = TRUE)
    x
}

publication_card <- function(row) {
    link <- row[["link"]]
    action <- if (nzchar(link)) {
        sprintf(
            '<a class="pub-link" href="%s" target="_blank" rel="noreferrer">Open DOI</a>',
            escape_html(link)
        )
    } else {
        '<span class="pub-link disabled">No DOI listed</span>'
    }

    sprintf(
        '<article class="publication-card">
            <div class="pub-year">%s</div>
            <div class="pub-body">
                <h2>%s</h2>
                <p class="pub-authors">%s</p>
                <p class="pub-journal">%s</p>
                <div class="pub-meta"><span>%s</span>%s</div>
            </div>
        </article>',
        escape_html(row[["year"]]),
        escape_html(row[["title"]]),
        escape_html(row[["authors"]]),
        escape_html(row[["journal"]]),
        escape_html(row[["date"]]),
        action
    )
}

cards <- publications_df %>%
    split(seq_len(nrow(.))) %>%
    map_chr(publication_card) %>%
    paste(collapse = "\n")

html_before_cards <- 
'<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Publications - Karim Anaya-Izquierdo</title>
    <style>
        :root {
            --bg-color: #0d1117;
            --card-bg: #161b22;
            --text-primary: #f0f6fc;
            --text-secondary: #8b949e;
            --accent-blue: #58a6ff;
            --border-color: #30363d;
            --hover-bg: #21262d;
        }

        body {
            margin: 0;
            padding: 40px;
            background: var(--bg-color);
            color: var(--text-secondary);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            line-height: 1.5;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
        }

        header {
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 24px;
            padding-bottom: 18px;
        }

        h1 {
            margin: 0 0 8px;
            color: var(--text-primary);
            font-size: 2.2rem;
            font-weight: 600;
        }

        .lead {
            margin: 0;
            max-width: 760px;
            color: var(--text-secondary);
        }

        .publication-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .publication-card {
            display: grid;
            grid-template-columns: 76px minmax(0, 1fr);
            gap: 18px;
            padding: 20px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--card-bg);
        }

        .pub-year {
            color: var(--accent-blue);
            font-weight: 700;
            font-size: 1rem;
            padding-top: 3px;
        }

        .pub-body {
            min-width: 0;
        }

        h2 {
            margin: 0 0 8px;
            color: var(--text-primary);
            font-size: 1.05rem;
            line-height: 1.35;
        }

        .pub-authors,
        .pub-journal {
            margin: 0 0 8px;
        }

        .pub-authors {
            color: var(--text-secondary);
        }

        .pub-journal {
            color: var(--text-primary);
            font-style: italic;
        }

        .pub-meta {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            color: var(--text-secondary);
            font-size: 0.88rem;
        }

        .pub-link {
            display: inline-flex;
            align-items: center;
            min-height: 36px;
            padding: 0 12px;
            border: 1px solid rgba(88, 166, 255, 0.45);
            border-radius: 6px;
            color: var(--accent-blue);
            text-decoration: none;
            white-space: nowrap;
        }

        .pub-link:hover {
            background: rgba(88, 166, 255, 0.12);
        }

        .pub-link.disabled {
            color: var(--text-secondary);
            border-color: var(--border-color);
        }

        @media (max-width: 700px) {
            body {
                padding: 20px 14px;
            }

            h1 {
                font-size: 1.7rem;
            }

            .publication-card {
                grid-template-columns: 1fr;
                gap: 8px;
                padding: 16px;
            }

            .pub-year {
                font-size: 0.9rem;
            }

            .pub-meta {
                align-items: flex-start;
                flex-direction: column;
            }

            .pub-link {
                width: 100%;
                justify-content: center;
                min-height: 44px;
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
            }
        })();
    </script>
</head>
<body>
    <main class="container">
        <header>
            <h1>Publications</h1>
            <p class="lead">Selected publications from Karim Anaya-Izquierdo, ordered by year and sourced from the local ORCID export.</p>
        </header>
        <section class="publication-list" aria-label="Publications">
'

html_after_cards <- 
'        </section>
    </main>
</body>
</html>'

html <- paste0(html_before_cards, cards, "\n", html_after_cards)

writeLines(html, "public/publications.html")
message("Wrote public/publications.html with ", nrow(publications_df), " publications")
