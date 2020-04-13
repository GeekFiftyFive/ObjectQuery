export function deepSortArrays(obj) {
  for(let [key, value] in obj) {
    if(typeof value == "object") {
      if(Array.isArray(value)) {
        obj[key] = value.sort();
      } else {
        obj[key] = deepSortArrays(value);
      }
    }
  }
}