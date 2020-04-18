import stringExpressionHelper from "../src/helpers/stringExpressionHelper";

describe("String Like Operator", () => {
  test("Like operator should match beginning of string", () => {
    const expression = {op: "like", value: "John%"};

    expect(stringExpressionHelper(expression, "John Smith")).toBeTruthy();
    expect(stringExpressionHelper(expression, "Smith John")).toBeFalsy();
  });

  test("Like operator should match end of string", () => {
    const expression = {op: "like", value: "%John"};

    expect(stringExpressionHelper(expression, "John Smith")).toBeFalsy();
    expect(stringExpressionHelper(expression, "Smith John")).toBeTruthy();
  });

  test("Like operator should match the middle of string", () => {
    const expression = {op: "like", value: "%John%"};

    expect(stringExpressionHelper(expression, "Kevin John Smith")).toBeTruthy();
    expect(stringExpressionHelper(expression, "John Smith")).toBeFalsy();
  });

  test("Like operator should match either side", () => {
    const expression = {op: "like", value: "John%Smith"};

    expect(stringExpressionHelper(expression, "John Kevin Smith")).toBeTruthy();
    expect(stringExpressionHelper(expression, "JohnSmith")).toBeFalsy();
  });

  test("Like operator should match multiple", () => {
    const expression = {op: "like", value: "%John%Smith"};

    expect(stringExpressionHelper(expression, "Kevin John Franklin Smith")).toBeTruthy();
    expect(stringExpressionHelper(expression, "Kevin JohnSmith")).toBeFalsy();
  });

  test("Should not be able to inject regex", () => {
    const expression = {op: "like", value: ".+"};

    expect(stringExpressionHelper(expression, "John Smith")).toBeFalsy();
  });
});