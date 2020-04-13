const handlers = {
  contains: (haystack, needles) => {
    let acc = true;

    needles.forEach(needle => {
      acc = acc && haystack.includes(needle);
    });

    return acc;
  },
  containsAny: (haystack, needles) => {
    let acc = false;

    needles.forEach(needle => {
      acc = acc || haystack.includes(needle);
    });

    return acc;
  }
};

export default function arrayExpressionHelper(expression, value) {
  return handlers[expression.op](value, expression.value);
};