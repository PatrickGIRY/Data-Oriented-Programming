import Catalog from "./catalog";
import _ from "lodash";
import UserManagement from "./user-management";

class Library {
  static searchBooksByTitleJSON = (libraryData, query) => {
    const catalogData = _.get(libraryData, "catalog");
    const results = Catalog.searchBooksByTitle(catalogData, query);
    return JSON.stringify(results);
  };

  static addMember = (libraryData, member) => {
    const currentUserManagement = _.get(libraryData, "userManagement");
    const nextUserManagement = UserManagement.addMember(
      currentUserManagement,
      member
    );
    return _.set(libraryData, "userManagement", nextUserManagement);
  };
}

export default Library;
