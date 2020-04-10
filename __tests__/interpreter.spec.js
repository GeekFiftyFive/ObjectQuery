import * as JSONQuery from "../src/index";
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

describe("Search Flat Files", () => {
  test("Should return only fields with exact matching fields", () => {
    let output = JSONQuery.interpret(selectSingleEquals, flat);
    expect(output).toEqual(selectSingleEqualsOutcome);
  });

  test("Should match fields with matching numeric expressions", () => {
    let output = JSONQuery.interpret(selectSingleNumericExpression, flat);
    expect(output).toEqual(selectSingleNumericExpressionOutcome);
  });

  test("Compound queries should return entries that satisfy all expressions", () => {
    let output = JSONQuery.interpret(compoundQuery, flat);
    expect(output).toEqual(compoundQueryOutcome);
  });

  test("Like queries should only return matches", () => {
    let output = JSONQuery.interpret(likeQuery, flat);
    expect(output).toEqual(likeQueryOutcome);
  });
});

describe("Search Nested Files", () => {
  test("Should return fields exactly matching field in child", () => {
    let output = JSONQuery.interpret(nestedQuery, nested);
    expect(output).toEqual(nestedQueryOutcome);
  });
});