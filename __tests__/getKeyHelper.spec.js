import getKey from "../src/helpers/getKeyHelper";

describe("getKeyHelper should properly escape key names", () => {
  test("Quoted strings should be extracted out", () => {
    const output = getKey("\"testKey\"");
    expect(output).toEqual("testKey");
  })
});