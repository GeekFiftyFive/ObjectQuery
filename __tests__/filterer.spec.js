import * as ObjectQuery from "../src/index";
import {selectSingleEquals} from "../__mocks__/queries/valid/selectSingleEquals";
import {selectSingleEqualsOutcome} from "../__mocks__/expected/selectSingleEqualsOutcome";
import {selectSingleNumericExpressionOutcome} from "../__mocks__/expected/selectSingleNumericExpressionOutcome";
import {selectSingleNumericExpression} from "../__mocks__/queries/valid/selectSingleNumericExpression";
import {flat} from "../__mocks__/input/flat";
import { compoundQuery } from "../__mocks__/queries/valid/compoundQuery";
import { compoundQueryOutcome } from "../__mocks__/expected/compoundQueryOutcome";
import { likeQuery } from "../__mocks__/queries/valid/likeQuery";
import { likeQueryOutcome } from "../__mocks__/expected/likeQueryOutcome";
import { nestedQuery } from "../__mocks__/queries/valid/nestedQuery";
import { nested } from "../__mocks__/input/nested";
import { nestedQueryOutcome } from "../__mocks__/expected/nestedQueryOutcome";
import { complexNestedQuery } from "../__mocks__/queries/valid/complexNestedQuery";
import { complexNestedQueryOutcome } from "../__mocks__/expected/complexNestedQueryOutcome";
import { notExpression } from "../__mocks__/queries/valid/notExpression";
import { notExpressionOutcome } from "../__mocks__/expected/notExpressionOutcome";
import { orExpression } from "../__mocks__/queries/valid/orExpression";
import { orExpressionOutcome } from "../__mocks__/expected/orExpressionOutcome";
import { objectLevelOr } from "../__mocks__/queries/valid/objectLevelOr";
import { objectLevelOrOutcome } from "../__mocks__/expected/objectLevelOrOutcome";
import { topLevelOr } from "../__mocks__/queries/valid/topLevelOr";
import { topLevelOrOutome } from "../__mocks__/expected/topLevelOrOutcome";
import { topLevelNot } from "../__mocks__/queries/valid/topLevelNot";
import { topLevelNotOutcome } from "../__mocks__/expected/topLevelNotOutcome";
import { objectLevelAnd } from "../__mocks__/queries/valid/objectLevelAnd";
import { objectLevelAndOutcome } from "../__mocks__/expected/objectLevelAndOutcome";
import { arrayQuery } from "../__mocks__/queries/valid/arrayQuery";
import { array } from "../__mocks__/input/array";
import { arrayQueryOutcome } from "../__mocks__/expected/arrayQueryOutcome";
import { deepSortArrays } from "./testHelpers/arrayHelper";
import { arrayContainsQuery } from "../__mocks__/queries/valid/arrayContainsQuery";
import { arrayContainsQueryOutcome } from "../__mocks__/expected/arrayContainsQueryOutcome";
import { arrayContainsAnyQuery } from "../__mocks__/queries/valid/arrayContainsAnyQuery";
import { arrayContainsAnyQueryOutcome } from "../__mocks__/expected/arrayContainsAnyQueryOutcome";

describe("Search Flat Files", () => {
  test("Should return only fields with exact matching fields", () => {
    let output = ObjectQuery.filter(selectSingleEquals, flat);
    expect(output).toEqual(selectSingleEqualsOutcome);
  });

  test("Should match fields with matching numeric expressions", () => {
    let output = ObjectQuery.filter(selectSingleNumericExpression, flat);
    expect(output).toEqual(selectSingleNumericExpressionOutcome);
  });

  test("Compound queries should return entries that satisfy all expressions", () => {
    let output = ObjectQuery.filter(compoundQuery, flat);
    expect(output).toEqual(compoundQueryOutcome);
  });

  test("Like queries should only return matches", () => {
    let output = ObjectQuery.filter(likeQuery, flat);
    expect(output).toEqual(likeQueryOutcome);
  });
});

describe("Search Nested Files", () => {
  test("Should return fields exactly matching field in child", () => {
    let output = ObjectQuery.filter(nestedQuery, nested);
    expect(output).toEqual(nestedQueryOutcome);
  });

  test("Should return fields matching expression", () => {
    let output = ObjectQuery.filter(complexNestedQuery, nested);
    expect(output).toEqual(complexNestedQueryOutcome);
  });
});

describe("Field Level Boolean Logic Expressions", () => {
  test("'Not' expressions should negate the underlying expression", () => {
    let output = ObjectQuery.filter(notExpression, flat);
    expect(output).toEqual(notExpressionOutcome);
  });

  test("'Or' expressions should evaluate to true if any sub expressions are true", () => {
    let output = ObjectQuery.filter(orExpression, flat);
    expect(output).toEqual(orExpressionOutcome);
  });
});

describe("Object Level Boolean Logic Expressions", () => {
  test("'Or' expressions should evaluate to true if any sub expressions are true", () => {
    let output = ObjectQuery.filter(objectLevelOr, nested);
    expect(output).toEqual(objectLevelOrOutcome);
  });

  test("'And' expressions should evaluate to true only if all sub expressions are true", () => {
    let output = ObjectQuery.filter(objectLevelAnd, nested);
    expect(output).toEqual(objectLevelAndOutcome);
  });

  test("Top level 'Or' expressions should evaluate to true if any sub expressions are true", () => {
    let output = ObjectQuery.filter(topLevelOr, flat);
    expect(output).toEqual(topLevelOrOutome);
  });

  test("Top level 'Not' expressions should evauluate to true if the sub expression is false", () => {
    let output = ObjectQuery.filter(topLevelNot, flat);
    expect(output).toEqual(topLevelNotOutcome);
  });
});

describe("Array Expressions", () => {
  test("Arrays should match on equality regardless of order", () => {
    let output = ObjectQuery.filter(arrayQuery, array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(arrayQueryOutcome));
  });

  test("'contain' expressions should match on any array that contains all items at any level", () => {
    let output = ObjectQuery.filter(arrayContainsQuery, array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(arrayContainsQueryOutcome));
  });

  test("'containsAny' expressions should match on any array that contains any item", () => {
    let output = ObjectQuery.filter(arrayContainsAnyQuery, array);
    expect(deepSortArrays(output)).toEqual(deepSortArrays(arrayContainsAnyQueryOutcome));
  });
});