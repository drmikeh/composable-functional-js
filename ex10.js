const { List, Map } = require("immutable-ext");

/**
 * Example 10 - Unbox types with foldMap
 */

// Sum monoid
const Sum = x => ({
    x,
    concat: ({ x: y }) => Sum(x + y),
    toString: () => `Sum(${x})`
});
Sum.empty = () => Sum(0);

// we can reduce an Array of Sums using concat
const res1 = [Sum(1), Sum(2), Sum(3)]
    .reduce((acc, x) => acc.concat(x), Sum.empty())

// we can Map to the Sum monoid and then fold
const res2 = Map({
    brian: 10,
    sara: 2
})
    .map(Sum)
    .fold(Sum.empty())

// foldMap does the mapping and the folding for us
const res3 = List.of(1, 2, 3)
    .foldMap(Sum, Sum.empty())

console.log("result 1: ", res1.toString());
console.log("result 2: ", res2.toString())
console.log("result 3: ", res3.toString())
