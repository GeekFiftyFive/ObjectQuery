export default function interpret(query, data) {
  let filtered = data.filter(entry => {
    let acc = true;

    for(let [key, value] of Object.entries(query)) {
      acc = acc && entry[key] == value;
    }

    return acc;
  });

  return filtered;
};