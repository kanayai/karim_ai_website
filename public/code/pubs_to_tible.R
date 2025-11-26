# this code loads the publications.json file
# from the 'data folder and converts it into a data frame'
library(jsonlite)
publications    <- fromJSON("data/publications.json")
publications_df <- as_tibble(publications)
publications_df