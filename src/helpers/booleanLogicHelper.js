const handlers = {
  "not": (key, expression, value, match) => {
    let query = {};

    if(key) {
      query[key] = expression.expression;
    } else {
      query = expression.expression;
    }

    return !match(query, value);
  },
  "or": (key, expression, value, match) => {
    let matched = false;

    expression.expressions.forEach(expr => {
      let query = {};

      if(key) {
        query[key] = expr;
      } else {
        query = expr;
      }
      
      matched = matched || match(query, value);
    });

    return matched;
  }
}

export default function booleanLogicHelper(key, expression, value, match) {
  return handlers[expression.op](key, expression, value, match);
}