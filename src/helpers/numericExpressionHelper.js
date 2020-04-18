const handlers = {
  "<": (left, right) => {
    return left < right;
  },
  ">": (left, right) => {
    return left > right;
  },
  "<=": (left, right) => {
    return left <= right;
  },
  ">=": (left, right) => {
    return left >= right;
  },
  "=": (left, right) => {
    return left == right;
  },
  "!=": (left, right) => {
    return left != right;
  }
};

export default function numericExpressionHelper(expression, value) {
  return handlers[expression.op](value, expression.value);
};