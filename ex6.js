const { First, All, Sum } = require('./FirstAllSum');

/**
 * Example 6 - Semigroups
 * A semigroup is a type with a concat method that has
 * the associative property.
 */
const res1 = Sum(1).concat(Sum(2))
console.log(res1.toString())

const res2 = All(false).concat(All(true))
console.log(res2.toString())

const res3 = First("blah")
    .concat(First("ice cream"))
    .concat(First('meta programming'))
console.log(res3.toString());
