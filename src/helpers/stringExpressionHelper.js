const handlers = {
  "!=": (left, right) => {
    return left !== right;
  },
  "=": (left, right) => {
    return left === right;
  },
  "like": (value, expression) => {
    if(!value) return false;
    const expr = expression.split('%').join('.+');
    const regex = new RegExp(expr);

    return value.match(regex) ? true : false;
  }
};

export default function stringExpressionHelper(expression, value) {
  return handlers[expression.op](value, expression.value);
}