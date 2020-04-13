import numericExpressionHelper from "../helpers/numericExpressionHelper";
import stringExpressionHelper from "../helpers/stringExpressionHelper";
import booleanLogicHelper from "../helpers/booleanLogicHelper";
import isExpression from "../helpers/isExpressionHelper";
import isArrayEqual from "../helpers/arrayEqualityHelper";
import arrayExpressionHelper from "../helpers/arrayExpressionHelper";

const objectExpressionHandlers = {
  "number" : numericExpressionHelper,
  "string": stringExpressionHelper,
  "object": (expression, value) => {
    if(Array.isArray(expression.value)) {
      return arrayExpressionHelper(expression, value);
    }

    console.warn("Reached path that should be unreachable! Expression was:");
    console.warn(expression);
  }
};

export default function filter(query, data) {
  let filtered = data.filter(entry => {
    return match(query, entry);
  });

  return filtered;
};

function isBooleanLogic(obj) {
  return obj.hasOwnProperty("expression") || obj.hasOwnProperty("expressions");
}

function match(query, entry) {
  let acc = true;

  if(isBooleanLogic(query)) {
    return booleanLogicHelper(null, query, entry, match);
  }

  for (let [key, value] of Object.entries(query)) {
    if(isBooleanLogic(value)) {
      acc = acc && booleanLogicHelper(key, value, entry, match);
    } else {
      switch (typeof value) {
        case "object":
          if(isExpression(value)) {
            let expType = typeof value.value;
            acc = acc && objectExpressionHandlers[expType](value, entry[key]);
          } else if(Array.isArray(value)) {
            acc = acc && isArrayEqual(value, entry[key]);
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
