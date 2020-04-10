import interpret from "../src/interpreter/interpreter";
import {selectSingleEquals} from "../__mocks__/queries/valid/selectSingleEquals";
import {selectSingleEqualsOutcome} from "../__mocks__/expected/selectSingleEqualsOutcome";
import {flat} from "../__mocks__/input/flat";

describe("Intepreter should return matching json", () => {
  test("Empty array should be returned on no matches", () => {
    let output = interpret(selectSingleEquals, flat);
    expect(output).toEqual(selectSingleEqualsOutcome);
  });
});