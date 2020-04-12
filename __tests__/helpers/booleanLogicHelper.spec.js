import * as ObjectQuery from "../../src/index";
import { notExpression } from "../../__mocks__/queries/valid/notExpression";
import { flat } from "../../__mocks__/input/flat";
import { notExpressionOutcome } from "../../__mocks__/expected/notExpressionOutcome";

describe("Test Boolean Logic Expressions", () => {
  test("'Not' expressions should negate the underlying expression", () => {
    let output = ObjectQuery.filter(notExpression, flat);
    expect(output).toEqual(notExpressionOutcome);
  });
});