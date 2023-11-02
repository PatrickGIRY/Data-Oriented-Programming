import _ from "lodash";

class Catalog {
  static authorNames = (catalogData, authorIds) =>
    _.map(authorIds, (authorId) =>
      _.get(catalogData, ["authorsById", authorId, "name"])
    );

  static bookInfo = (catalogData, book) => {
    return {
      title: _.get(book, "title"),
      isbn: _.get(book, "isbn"),
      authorNames: Catalog.authorNames(catalogData, _.get(book, "authorIds")),
    };
  };

  static searchBooksByTitle = (catalogData, query) => {
    const allBooks = _.get(catalogData, "booksByIsbn");
    const queryLowerCased = query.toLowerCase();
    const matchingBooks = _.filter(allBooks, (book) => {
      return _.get(book, "title").toLowerCase().includes(queryLowerCased);
    });
    return _.map(matchingBooks, (book) => {
      return Catalog.bookInfo(catalogData, book);
    });
  };
}

export default Catalog;
