import numericExpressionHelper from "../src/helpers/numericExpressionHelper";

describe("Numeric Expression Helper", () => {
  test("Less than operator", () => {
    const expression = {op: "<", value: 4};
    expect(numericExpressionHelper(expression, 3)).toBeTruthy();
    expect(numericExpressionHelper(expression, 4)).toBeFalsy();
  });

  test("Greater than operator", () => {
    const expression = {op: ">", value: 4};
    expect(numericExpressionHelper(expression, 5)).toBeTruthy();
    expect(numericExpressionHelper(expression, 4)).toBeFalsy();
  });

  test("Equal to operator", () => {
    const expression = {op: "=", value: 4};
    expect(numericExpressionHelper(expression, 3)).toBeFalsy();
    expect(numericExpressionHelper(expression, 4)).toBeTruthy();
    expect(numericExpressionHelper(expression, 5)).toBeFalsy();
  });

  test("Less than or equal operator", () => {
    const expression = {op: "<=", value: 4};
    expect(numericExpressionHelper(expression, 3)).toBeTruthy();
    expect(numericExpressionHelper(expression, 4)).toBeTruthy();
    expect(numericExpressionHelper(expression, 5)).toBeFalsy();
  });

  test("Greater than or equal operator", () => {
    const expression = {op: ">=", value: 4};
    expect(numericExpressionHelper(expression, 3)).toBeFalsy();
    expect(numericExpressionHelper(expression, 4)).toBeTruthy();
    expect(numericExpressionHelper(expression, 5)).toBeTruthy();
  });

  test("Not Equal to operator", () => {
    const expression = {op: "!=", value: 4};
    expect(numericExpressionHelper(expression, 3)).toBeTruthy();
    expect(numericExpressionHelper(expression, 4)).toBeFalsy();
    expect(numericExpressionHelper(expression, 5)).toBeTruthy();
  });

  test("Divisible By Operator", () => {
    const expression = {op: "divisibleBy", value: 4};
    expect(numericExpressionHelper(expression, 16)).toBeTruthy();
    expect(numericExpressionHelper(expression, 4)).toBeTruthy();
    expect(numericExpressionHelper(expression, 5)).toBeFalsy();
    expect(numericExpressionHelper(expression, 16.5)).toBeFalsy();
  });

  test("Is Integral Operator Matches on Truth", () => {
    const expression = {op: "isIntegral", value: true};
    expect(numericExpressionHelper(expression, 16)).toBeTruthy();
    expect(numericExpressionHelper(expression, 4)).toBeTruthy();
    expect(numericExpressionHelper(expression, 5.12)).toBeFalsy();
    expect(numericExpressionHelper(expression, 16.5)).toBeFalsy();
  });

  test("Is Integral Operator Matches on False", () => {
    const expression = {op: "isIntegral", value: false};
    expect(numericExpressionHelper(expression, 16)).toBeFalsy();
    expect(numericExpressionHelper(expression, 4)).toBeFalsy();
    expect(numericExpressionHelper(expression, 5.12)).toBeTruthy();
    expect(numericExpressionHelper(expression, 16.5)).toBeTruthy();
  });
});