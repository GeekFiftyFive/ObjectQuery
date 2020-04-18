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
  },
  divisibleBy: (dividend, divisor) => {
    return !(dividend % divisor);
  },
  isIntegral: (value, expectation) => {
    return Number.isInteger(value) === expectation;
  }
};

export default function numericExpressionHelper(expression, value) {
  return handlers[expression.op](value, expression.value);
};