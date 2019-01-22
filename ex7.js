require("immutable");
const { Map } = require("immutable-ext");
const { First, All, Sum } = require('./FirstAllSum');
/**
 * Example 7 - Semigroup Examples
 * This example shows that if a data structure
 * is entirely made up of Semigroups
 * then it will be a Semigroup itself.
 */
const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] })
const acct2 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(2), friends: ['Gatsby'] })
const res = acct1.concat(acct2);
console.log(JSON.stringify(res, null, 4));
