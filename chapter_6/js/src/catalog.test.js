import { expect, test, describe } from "vitest";
import Catalog from "./catalog";

describe("Catalog.authorNames", () => {
  describe("given two authors in the catalog", () => {
    const catalogData = {
      authorsById: {
        "alan-moore": {
          name: "Alan Moore",
        },
        "dave-gibbons": {
          name: "Dave Gibbons",
        },
      },
    };

    test("and no authorIds", () => {
      const result = Catalog.authorNames(catalogData, []);
      expect(result).toHaveLength(0);
    });

    test("and one authorId", () => {
      const result = Catalog.authorNames(catalogData, ["alan-moore"]);
      expect(result).toContain("Alan Moore");
    });

    test("and a non existing authorId", () => {
      const result = Catalog.authorNames(catalogData, ["albert-einstein"]);
      expect(result).toContain(undefined);
    });

    test("and two authorIds", () => {
      const result = Catalog.authorNames(catalogData, [
        "alan-moore",
        "dave-gibbons",
      ]);
      expect(result).toContain("Alan Moore", "Dave Gibbons");
    });

    test("and one existing authorId and a non existing authorId", () => {
      const result = Catalog.authorNames(catalogData, [
        "alan-moore",
        "albert-einstein",
      ]);
      expect(result).toContain("Alan Moore", undefined);
    });
  });

  describe("given an empty catalog", () => {
    const catalogData = {};
    test("and no authorIds", () => {
      const result = Catalog.authorNames(catalogData, []);
      expect(result).toHaveLength(0);
    });

    test("and one authorId", () => {
      const result = Catalog.authorNames(catalogData, ["alan-moore"]);
      expect(result).toContain(undefined);
    });
  });
});

describe("Catalog.bookInfo", () => {
  const catalogData = {
    authorsById: {
      "alan-moore": {
        name: "Alan Moore",
      },
      "dave-gibbons": {
        name: "Dave Gibbons",
      },
    },
  };

  test("create a book info", () => {
    const book = {
      isbn: "978-1779501127",
      title: "Watchmen",
      pulicationYear: 1987,
      authorIds: ["alan-moore", "dave-gibbons"],
    };

    const expectedBookInfo = {
      authorNames: ["Alan Moore", "Dave Gibbons"],
      isbn: "978-1779501127",
      title: "Watchmen",
    };

    const result = Catalog.bookInfo(catalogData, book);

    expect(result).toEqual(expectedBookInfo);
  });
});

describe("Catalog.searchBooksByTitle", () => {
  const catalogData = {
    booksByIsbn: {
      "978-1779501127": {
        isbn: "978-1779501127",
        title: "Watchmen",
        publicationYear: 1987,
        authorIds: ["alan-moore", "dave-gibbons"],
      },
    },
    authorsById: {
      "alan-moore": {
        name: "Alan Moore",
        bookIsbns: ["978-1779501127"],
      },
      "dave-gibbons": {
        name: "Dave Gibbons",
        bookIsbns: ["978-1779501127"],
      },
    },
  };
  test.each(["Watchmen", "watchmen"])(
    "find a book by known title '%s' ignoring case",
    (query) => {
      const expectedBookInfo = {
        authorNames: ["Alan Moore", "Dave Gibbons"],
        isbn: "978-1779501127",
        title: "Watchmen",
      };

      const result = Catalog.searchBooksByTitle(catalogData, query);

      expect(result).toEqual([expectedBookInfo]);
    }
  );
});
