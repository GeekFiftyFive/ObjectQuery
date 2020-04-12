const handlers = {
  "not": (key, expression, value, match) => {
    let query = {};
    query[key] = expression.expression;
    return !match(query, value);
  }
}

export default function booleanLogicHelper(key, expression, value, match) {
  return handlers[expression.op](key, expression, value, match);
}