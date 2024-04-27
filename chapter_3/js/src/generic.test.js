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

describe("Generic.map", () => {
  test("return empty array when no given collection and mapper function", () => {
    const result = Generic.map();

    expect(result).toEqual([]);
    expect(result).toEqual(_.map());
  });

  test("return given collection when no given mapper function", () => {
    const data = [{ foo: true }];
    const result = Generic.map(data);

    expect(result).toEqual(data);
    expect(result).toEqual(_.map(data));
  });

  test("return array of undefined when given object and mapper function", () => {
    const data = {
      "978-1779501127": {
        title: "Watchmen",
      },
      foo: true,
    };
    const mapper = (book) => {
      book["title"];
    };
    const result = Generic.map(data, mapper);

    expect(result).toEqual([undefined, undefined]);
    expect(result).toEqual(_.map(data, mapper));
  });

  test("return array of object property values when given object and no mapper function", () => {
    const data = { "first-name": "Paul", isOk: true };
    const result = Generic.map(data);

    expect(result).toEqual(["Paul", true]);
    expect(result).toEqual(_.map(data));
  });

  test("return array of undefined when given object and mapper function", () => {
    const data = { foo: true };
    const mapper = (d) => d.foo;
    const result = Generic.map(data, mapper);

    expect(result).toEqual([undefined]);
    expect(result).toEqual(_.map(data, mapper));
  });

  test("return array of transformed data when given collection and mapper function", () => {
    const data = [{ isOk: true }, { isOk: false }];
    const mapper = (d) => d.isOk;
    const result = Generic.map(data, mapper);

    expect(result).toEqual([true, false]);
    expect(result).toEqual(_.map(data, mapper));
  });
});
