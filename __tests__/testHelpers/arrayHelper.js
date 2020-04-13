export function deepSortArrays(obj) {
  return obj.map(deepSortSubArrays);
}

function deepSortSubArrays(obj) {
  for (let [key, value] of Object.entries(obj)) {
    if (typeof value == "object") {
      if (Array.isArray(value)) {
        obj[key] = value.sort();
      }
      else {
        obj[key] = deepSortArrays(value);
      }
    }
  }

  return obj;
}
