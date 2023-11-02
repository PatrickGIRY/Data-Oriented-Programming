# Chapter 6 : Unit tests

The steps of the test case

1. Generate data input: `dataIn`
2. Generate expected output: `dataOut`
3. Compare the output of the function with the expected output `f(dataIn)` and `dataOut`

The tree of function calls for the search query code flow

```mermaid
flowchart TD
    Library.searchBooksByTitleJSON -.-> _.get
    Library.searchBooksByTitleJSON -.-> JSON.stringify
    Library.searchBooksByTitleJSON -.-> Catalog.searhBooksByTitle
    Catalog.searhBooksByTitle -.-> _.get
    Catalog.searhBooksByTitle -.-> _.map
    Catalog.searhBooksByTitle -.-> _.filter
    Catalog.searhBooksByTitle -.-> Catalog.bookInfo
    Catalog.bookInfo -.-> _.get
    Catalog.bookInfo -.-> Catalog.authorNames
    Catalog.authorNames -.-> _.get
    Catalog.authorNames -.-> _.map
```
