# this code loads the publications.json file
# from the 'data folder and converts it into a data frame'
library(tidyverse)
library(jsonlite)
publications_df <- fromJSON("data/publications.json")
publications_df <- publications_df   %>% 
                    select(year,title,authors,journal) %>% 
                        arrange(desc(year)) %>% 
                            as_tibble()
publications_df
