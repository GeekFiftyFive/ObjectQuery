const handlers = {
  "not": (key, expression, value, match) => {
    let query = {};
    query[key] = expression.expression;
    return !match(query, value);
  },
  "or": (key, expression, value, match) => {
    let matched = false;

    expression.expressions.forEach(expr => {
      let query = {};
      query[key] = expr;
      matched = matched || match(query, value);
    });

    return matched;
  }
}

export default function booleanLogicHelper(key, expression, value, match) {
  return handlers[expression.op](key, expression, value, match);
}