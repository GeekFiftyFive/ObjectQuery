const handlers = {
  "!=": (left, right) => {
    return left !== right;
  }
};

export default function stringExpressionHelper(expression, value) {
  return handlers[expression.op](value, expression.value);
}