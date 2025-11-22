# Publications Display Script
# Reads publications from JSON and displays them with DOI links

library(tidyverse)
library(jsonlite)
library(knitr)

# Read the publications JSON file
publications <- fromJSON("data/publications.json")

# Convert to tibble and arrange by year (descending)
pubs_df <- publications %>%
  as_tibble() %>%
  arrange(desc(as.numeric(year)))

# Display publications with formatted output
pubs_df %>%
  mutate(
    # Format the citation with clickable DOI link
    citation = paste0(
      "**", title, "**  \n",
      authors, "  \n",
      "*", journal, "*  \n",
      "[", link, "](", link, ")"
    )
  ) %>%
  select(year, citation) %>%
  group_by(year) %>%
  summarise(
    publications = paste(citation, collapse = "\n\n---\n\n")
  ) %>%
  arrange(desc(as.numeric(year))) %>%
  kable(format = "markdown", col.names = c("Year", "Publications"))
