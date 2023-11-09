import { expect, test, describe } from "vitest";
import Generic from "./generic";
import _ from "lodash";

describe("Generic.get", () => {
  const data = {
    booksByIsbn: {
      "978-1779501127": {
        title: "Watchmen",
      },
    },
  };
  test("return undefined when no given info path", () => {
    const result = Generic.get(data);

    expect(result).toBeUndefined();
    expect(result).toEqual(_.get(data));
  });

  test("return first level data property when info path contains one existing property", () => {
    const path = ["booksByIsbn"];

    const result = Generic.get(data, path);

    expect(result).toEqual({
      "978-1779501127": {
        title: "Watchmen",
      },
    });
    expect(result).toEqual(_.get(data, path));
  });

  test("return second level data property when info path contains two existing properties", () => {
    const path = ["booksByIsbn", "978-1779501127"];

    const result = Generic.get(data, path);

    expect(result).toEqual({
      title: "Watchmen",
    });
    expect(result).toEqual(_.get(data, path));
  });

  test("return third level data property when info path contains three existing properties", () => {
    const path = ["booksByIsbn", "978-1779501127", "title"];

    const result = Generic.get(data, path);

    expect(result).toEqual("Watchmen");
    expect(result).toEqual(_.get(data, path));
  });

  test.each([
    [["foo"]],
    [["booksByIsbn", "foo"]],
    [["booksByIsbn", "978-1779501127", "foo"]],
  ])(
    "return undefined when info path %o contains non existing property",
    (path) => {
      const result = Generic.get(data, path);

      expect(result).toBeUndefined();
      expect(result).toEqual(_.get(data, path));
    }
  );
});
