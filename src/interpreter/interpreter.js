import numericExpressionHelper from "../helpers/numericExpressionHelper";
import stringExpressionHelper from "../helpers/stringExpressionHelper";

const objectExpressionHandlers = {
  "number" : numericExpressionHelper,
  "string": stringExpressionHelper
};

export default function interpret(query, data) {
  let filtered = data.filter(entry => {
    return match(query, entry);
  });

  return filtered;
};

function isExpression(obj) {
  return obj.op != undefined && obj.value != undefined;
}

function match(query, entry) {
  let acc = true;
  for (let [key, value] of Object.entries(query)) {
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
  return acc;
}
