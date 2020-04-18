import * as ObjectQuery from "../src/index";
import * as imports from "./testHelpers/testImports";
import { deepSortArrays } from "./testHelpers/arrayHelper";

describe("Search Flat Files", () => {
  test("Should return only fields with exact matching fields", () => {
    let output = ObjectQuery.filter(imports.selectSingleEquals, imports.flat);
    expect(output).toEqual(imports.selectSingleEqualsOutcome);
  });

  test("Should match fields with matching numeric expressions", () => {
    let output = ObjectQuery.filter(imports.selectSingleNumericExpression, imports.flat);
    expect(output).toEqual(imports.selectSingleNumericExpressionOutcome);
  });

  test("Compound queries should return entries that satisfy all expressions", () => {
    let output = ObjectQuery.filter(imports.compoundQuery, imports.flat);
    expect(output).toEqual(imports.compoundQueryOutcome);
  });

  test("Like queries should only return matches", () => {
    let output = ObjectQuery.filter(imports.likeQuery, imports.flat);
    expect(output).toEqual(imports.likeQueryOutcome);
  });
});

describe("Search Nested Files", () => {
  test("Should return fields exactly matching field in child", () => {
    let output = ObjectQuery.filter(imports.nestedQuery, imports.nested);
    expect(output).toEqual(imports.nestedQueryOutcome);
  });

  test("Should return fields matching expression", () => {
    let output = ObjectQuery.filter(imports.complexNestedQuery, imports.nested);
    expect(output).toEqual(imports.complexNestedQueryOutcome);
  });
});

describe("Field Level Boolean Logic Expressions", () => {
  test("'Not' expressions should negate the underlying expression", () => {
    let output = ObjectQuery.filter(imports.notExpression, imports.flat);
    expect(output).toEqual(imports.notExpressionOutcome);
  });

  test("'Or' expressions should evaluate to true if any sub expressions are true", () => {
    let output = ObjectQuery.filter(imports.orExpression, imports.flat);
    expect(output).toEqual(imports.orExpressionOutcome);
  });
});

describe("Object Level Boolean Logic Expressions", () => {
  test("'Or' expressions should evaluate to true if any sub expressions are true", () => {
    let output = ObjectQuery.filter(imports.objectLevelOr, imports.nested);
    expect(output).toEqual(imports.objectLevelOrOutcome);
  });

  test("'And' expressions should evaluate to true only if all sub expressions are true", () => {
    let output = ObjectQuery.filter(imports.objectLevelAnd, imports.nested);
    expect(output).toEqual(imports.objectLevelAndOutcome);
  });

  test("Top level 'Or' expressions should evaluate to true if any sub expressions are true", () => {
    let output = ObjectQuery.filter(imports.topLevelOr, imports.flat);
    expect(output).toEqual(imports.topLevelOrOutome);
  });

  test("Top level 'Not' expressions should evauluate to true if the sub expression is false", () => {
    let output = ObjectQuery.filter(imports.topLevelNot, imports.flat);
    expect(output).toEqual(imports.topLevelNotOutcome);
  });
});

describe("Array Expressions", () => {
  test("Arrays should match on equality regardless of order", () => {
    let output = ObjectQuery.filter(imports.arrayQuery, imports.array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(imports.arrayQueryOutcome));
  });

  test("'contain' expressions should match on any array that contains all items at any level", () => {
    let output = ObjectQuery.filter(imports.arrayContainsQuery, imports.array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(imports.arrayContainsQueryOutcome));
  });

  test("'containsAny' expressions should match on any array that contains any item", () => {
    let output = ObjectQuery.filter(imports.arrayContainsAnyQuery, imports.array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(imports.arrayContainsAnyQueryOutcome));
  });

  test("'=' expressions should match on an array that contains all items", () => {
    let output = ObjectQuery.filter(imports.arrayEqualsQuery, imports.array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(imports.arrayQueryOutcome));
  });
});

describe("Escaped Field Names", () => {
  test("Should be able to check for equivalence on fields called 'op' and 'value'", () => {
    let output = ObjectQuery.filter(imports.specialFieldNamesQuery, imports.specialFieldNames);
    expect(output).toEqual(imports.specialFieldNamesQueryOutcome);
  });
});