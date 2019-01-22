const First = x => ({
  x,
  concat: _ => First(x),
  toString: () => `First(${x})`
});

// All is a logical AND boolean data type
const All = x => ({
  x,
  concat: ({x: y}) => All(x && y),
  toString: () => `All(${x})`
});
All.empty = () => All(true);    // true is the identify value for logical AND

const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  toString: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);       // zero is the identify value for addition

module.exports = {
    First,
    All,
    Sum
};
