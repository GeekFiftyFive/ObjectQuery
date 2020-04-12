import numericExpressionHelper from "../helpers/numericExpressionHelper";
import stringExpressionHelper from "../helpers/stringExpressionHelper";
import booleanLogicHelper from "../helpers/booleanLogicHelper";

const objectExpressionHandlers = {
  "number" : numericExpressionHelper,
  "string": stringExpressionHelper,
};

export default function filter(query, data) {
  let filtered = data.filter(entry => {
    return match(query, entry);
  });

  return filtered;
};

function isExpression(obj) {
  return obj.op != undefined && obj.value != undefined;
}

function isBooleanLogic(obj) {
  return obj.hasOwnProperty("expression") || obj.hasOwnProperty("expressions");
}

function match(query, entry) {
  let acc = true;
  for (let [key, value] of Object.entries(query)) {
    if(isBooleanLogic(value)) {
      acc = acc && booleanLogicHelper(key, value, entry, match);
    } else {
      switch (typeof value) {
        case "object":
          if(isExpression(value)) {
            let expType = typeof value.value;
            acc = acc && objectExpressionHandlers[expType](value, entry[key]);
          } else {
            return match(value, entry[key]);
          }
          break;
        case "string":
        case "number":
          acc = acc && entry[key] == value;
          break;
      }
    }
  }
  return acc;
}
