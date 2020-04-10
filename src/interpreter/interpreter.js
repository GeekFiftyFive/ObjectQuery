import numericExpressionHelper from "../helpers/numericExpressionHelper";

export default function interpret(query, data) {
  let filtered = data.filter(entry => {
    let acc = true;

    for(let [key, value] of Object.entries(query)) {
      switch(typeof value) {
        case "object":
          acc = acc & numericExpressionHelper(value, entry[key]);
          break;
        case "string":
        case "number":
          acc = acc && entry[key] == value;
          break;
      }
    }

    return acc;
  });

  return filtered;
};