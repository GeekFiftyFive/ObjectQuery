const handlers = {
  "not": (key, expression, value, match) => {
    let query = getQuery(key, expression.expression);
    return !match(query, value);
  },

  "or": (key, expression, value, match) => {
    let matched = false;

    expression.expressions.forEach(expr => {
      let query = getQuery(key, expr);
      
      matched = matched || match(query, value);
    });

    return matched;
  }
}

function getQuery(key, expr) {
  let query = {};
  if (key) {
    query[key] = expr;
  }
  else {
    query = expr;
  }
  return query;
}

export default function booleanLogicHelper(key, expression, value, match) {
  return handlers[expression.op](key, expression, value, match);
}