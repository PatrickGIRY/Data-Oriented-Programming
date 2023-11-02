import { expect, test, describe } from "vitest";
import Library from "./library";

describe("Library.searhBooksByTitleJSON", () => {
  const libraryData = {
    catalog: {
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
    },
  };

  test("search books'library by title", () => {
    const expectedBookInfo = {
      authorNames: ["Alan Moore", "Dave Gibbons"],
      isbn: "978-1779501127",
      title: "Watchmen",
    };

    const result = JSON.parse(
      Library.searchBooksByTitleJSON(libraryData, "Watchmen")
    );

    expect(result).toEqual([expectedBookInfo]);
  });
});
