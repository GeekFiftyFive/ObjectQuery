export default function getKey(key) {
  let match = /\"(.*)\"/g.exec(key);
  match = match ? match[1] : key;
  return match;
};