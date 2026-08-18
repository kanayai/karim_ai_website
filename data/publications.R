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
            '<a class="pub-link" href="%s" target="_blank" rel="noreferrer">DOI</a>',
            escape_html(link)
        )
    } else {
        '<span class="pub-link disabled">No DOI listed</span>'
    }
    search_text <- paste(row[["title"]], row[["authors"]], row[["journal"]], row[["year"]])

    sprintf(
        '<article class="publication-card" data-year="%s" data-search="%s">
            <div class="pub-year"><span>%s</span></div>
            <div class="pub-body">
                <h2>%s</h2>
                <p class="pub-authors">%s</p>
                <p class="pub-journal">%s</p>
                <div class="pub-meta"><span>%s</span>%s</div>
            </div>
        </article>',
        escape_html(row[["year"]]),
        escape_html(tolower(search_text)),
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

year_options <- publications_df %>%
    distinct(year) %>%
    arrange(desc(year)) %>%
    pull(year) %>%
    map_chr(~ sprintf('<option value="%s">%s</option>', escape_html(.x), escape_html(.x))) %>%
    paste(collapse = "\n")

publication_count <- nrow(publications_df)
year_count <- n_distinct(publications_df$year)

html_before_cards <- paste0(
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
            padding: clamp(18px, 4vw, 40px);
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
            padding-bottom: 20px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 20px;
            align-items: end;
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

        .pub-summary {
            display: flex;
            gap: 10px;
            justify-content: flex-end;
            flex-wrap: wrap;
        }

        .pub-summary span {
            min-height: 34px;
            display: inline-flex;
            align-items: center;
            padding: 0 11px;
            border: 1px solid var(--border-color);
            border-radius: 999px;
            background: var(--hover-bg);
            color: var(--text-primary);
            font-size: 0.85rem;
            white-space: nowrap;
        }

        .pub-controls {
            position: sticky;
            top: 0;
            z-index: 3;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(132px, 180px);
            gap: 10px;
            margin-bottom: 16px;
            padding: 10px 0;
            background: var(--bg-color);
        }

        .pub-controls input,
        .pub-controls select {
            width: 100%;
            min-height: 44px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--card-bg);
            color: var(--text-primary);
            font: inherit;
        }

        .pub-controls input {
            padding: 0 13px;
        }

        .pub-controls select {
            padding: 0 11px;
        }

        .result-count {
            margin: 0 0 10px;
            color: var(--text-secondary);
            font-size: 0.88rem;
        }

        .publication-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
        }

        .publication-card {
            display: grid;
            grid-template-columns: 68px minmax(0, 1fr);
            gap: 16px;
            padding: 18px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--card-bg);
        }

        .pub-year {
            display: flex;
            align-items: flex-start;
        }

        .pub-year span {
            min-width: 54px;
            min-height: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(88, 166, 255, 0.35);
            border-radius: 999px;
            color: var(--accent-blue);
            font-weight: 700;
            font-size: 0.9rem;
        }

        .pub-body {
            min-width: 0;
        }

        h2 {
            margin: 0 0 8px;
            color: var(--text-primary);
            font-size: 1.05rem;
            line-height: 1.35;
            overflow-wrap: anywhere;
        }

        .pub-authors,
        .pub-journal {
            margin: 0 0 8px;
        }

        .pub-authors {
            color: var(--text-secondary);
            overflow-wrap: anywhere;
        }

        .pub-journal {
            color: var(--text-primary);
            font-style: italic;
            overflow-wrap: anywhere;
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
            font-weight: 600;
        }

        .pub-link:hover {
            background: rgba(88, 166, 255, 0.12);
        }

        .pub-link.disabled {
            color: var(--text-secondary);
            border-color: var(--border-color);
        }

        .empty-state {
            display: none;
            padding: 28px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--card-bg);
            text-align: center;
        }

        @media (max-width: 700px) {
            body {
                padding: 18px 12px 28px;
            }

            header {
                grid-template-columns: 1fr;
                gap: 14px;
            }

            h1 {
                font-size: 1.7rem;
            }

            .pub-summary {
                justify-content: flex-start;
            }

            .pub-controls {
                grid-template-columns: 1fr;
                padding-top: 8px;
            }

            .publication-card {
                grid-template-columns: 1fr;
                gap: 10px;
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
            <div>
                <h1>Publications</h1>
                <p class="lead">Selected publications from Karim Anaya-Izquierdo, ordered by year and sourced from the local ORCID export.</p>
            </div>
            <div class="pub-summary" aria-label="Publication summary">
                <span>', publication_count, ' publications</span>
                <span>', year_count, ' years</span>
            </div>
        </header>
        <section class="pub-controls" aria-label="Publication filters">
            <input id="publication-search" type="search" placeholder="Search title, authors, journal, or year" autocomplete="off">
            <select id="publication-year" aria-label="Filter by year">
                <option value="">All years</option>
', year_options, '
            </select>
        </section>
        <p id="publication-count" class="result-count">Showing ', publication_count, ' publications</p>
        <section class="publication-list" aria-label="Publications">
')

html_after_cards <- 
'        </section>
        <div id="publication-empty" class="empty-state">No publications match those filters.</div>
    </main>
    <script>
        (function () {
            const searchInput = document.getElementById("publication-search");
            const yearSelect = document.getElementById("publication-year");
            const count = document.getElementById("publication-count");
            const empty = document.getElementById("publication-empty");
            const cards = Array.from(document.querySelectorAll(".publication-card"));

            function update() {
                const query = searchInput.value.trim().toLowerCase();
                const year = yearSelect.value;
                let visible = 0;

                cards.forEach(function (card) {
                    const matchesQuery = !query || card.dataset.search.includes(query);
                    const matchesYear = !year || card.dataset.year === year;
                    const show = matchesQuery && matchesYear;
                    card.hidden = !show;
                    if (show) visible += 1;
                });

                count.textContent = "Showing " + visible + " " + (visible === 1 ? "publication" : "publications");
                empty.style.display = visible === 0 ? "block" : "none";
            }

            searchInput.addEventListener("input", update);
            yearSelect.addEventListener("change", update);
        })();
    </script>
</body>
</html>'

html <- paste0(html_before_cards, cards, "\n", html_after_cards)

writeLines(html, "public/publications.html")
message("Wrote public/publications.html with ", nrow(publications_df), " publications")
