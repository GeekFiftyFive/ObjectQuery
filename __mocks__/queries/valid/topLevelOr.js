export const topLevelOr = {
  op: "or",
  expressions: [
    {
      first_name: {
        op: "=",
        value: "John"
      }
    },
    {
      name: {
        op: "like",
        value: "John%"
      }
    }
  ]
};