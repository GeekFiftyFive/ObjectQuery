export const objectLevelAnd = {
  contact: {
    tel: {
      op: "and",
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
            value: "48493 75573"
          }
        }
      ]
    }
  }
};