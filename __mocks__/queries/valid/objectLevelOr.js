export const objectLevelOr = {
  contact: {
    tel: {
      op: "or",
      expressions: [
        {
          work: {
            op: "=",
            value: "01234 56789"
          }
        },
        {
          home: {
            op: "=",
            value: "57439 947393"
          }
        }
      ]
    }
  }
};