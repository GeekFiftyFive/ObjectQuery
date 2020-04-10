const handlers = {
  "!=": (left, right) => {
    return left !== right;
  },
  "=": (left, right) => {
    return left === right;
  },
  "like": (value, expression) => {
    if(!value) return false;
    let specialLoc = expression.indexOf('%');
    if(specialLoc == 0) {
      let [_, exp] = expression.split('%');
      return value.indexOf(exp) == value.length - exp.length; 
    } else if(specialLoc == expression.length - 1) {
      let [exp, _] = expression.split('%');
      return value.indexOf(exp) == 0;
    } else {
      //FIXME: Handle like expressions properly
      throw new Error("Using like operations in this manner is not currently implemented");
    }

    return false;
  }
};

export default function stringExpressionHelper(expression, value) {
  return handlers[expression.op](value, expression.value);
}