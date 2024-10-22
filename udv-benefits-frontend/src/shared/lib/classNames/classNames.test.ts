import { classNames } from "./classNames";

describe("classNames testsuite", () => {
  test("only with one param", () => {
    expect(classNames("base", {}, [])).toBe("base");
  });

  test("with additional classes", () => {
    const expected = "base1 added2 added3";

    expect(classNames("base1", {}, ["added2", "added3"])).toBe(expected);
  });

  test("with mod", () => {
    const expected = "base hovered";

    expect(classNames("base", { hovered: true }, [])).toBe(expected);
  });

  test("with mod false", () => {
    const expected = "base";

    expect(classNames("base", { hovered: false }, [])).toBe(expected);
  });

  test("with mod and additional", () => {
    const expected = "base hovered additional";

    expect(classNames("base", { hovered: true }, ["additional"])).toBe(
      expected
    );
  });
});
