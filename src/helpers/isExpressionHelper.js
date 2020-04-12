export default function isExpression(obj) {
  return obj.op != undefined && obj.value != undefined;
};