import {interpret} from "../src/index";
import {selectSingleEquals} from "../__mocks__/queries/valid/selectSingleEquals";
import {selectSingleEqualsOutcome} from "../__mocks__/expected/selectSingleEqualsOutcome";
import {selectSingleNumericExpressionOutcome} from "../__mocks__/expected/selectSingleNumericExpressionOutcome";
import {selectSingleNumericExpression} from "../__mocks__/queries/valid/selectSingleNumericExpression";
import {flat} from "../__mocks__/input/flat";
import { compoundQuery } from "../__mocks__/queries/valid/compoundQuery";
import { compoundQueryOutcome } from "../__mocks__/expected/compoundQueryOutcome";

describe("Intepreter should return matching json", () => {
  test("Should return only fields with exact matching fields", () => {
    let output = interpret(selectSingleEquals, flat);
    expect(output).toEqual(selectSingleEqualsOutcome);
  });

  test("Should match fields with matching numeric expressions", () => {
    let output = interpret(selectSingleNumericExpression, flat);
    expect(output).toEqual(selectSingleNumericExpressionOutcome);
  });

  test("Compound queries should return entries that satisfy all expressions", () => {
    let output = interpret(compoundQuery, flat);
    expect(output).toEqual(compoundQueryOutcome);
  });
});