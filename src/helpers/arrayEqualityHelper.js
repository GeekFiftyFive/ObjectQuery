export default function isArrayEqual(left, right) {
  if(left.length != right.length) return false;
  let leftSorted = left.sort();
  let rightSorted = right.sort();

  for(let i = 0; i < left.length; i++) {
    if(leftSorted[i] != rightSorted[i]) return false;
  }

  return true;
};