import Catalog from "./catalog";
import _ from "lodash";

class Library {
  static searchBooksByTitleJSON = (libraryData, query) => {
    const catalogData = _.get(libraryData, "catalog");
    const results = Catalog.searchBooksByTitle(catalogData, query);
    return JSON.stringify(results);
  };
}

export default Library;
