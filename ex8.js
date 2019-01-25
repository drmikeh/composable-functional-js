const { Sum, All } = require('./FirstAllSum');

/**
 * Example 8 - Monoids
 * 
 * A Monoid is a semigroup with a neutral / identity value
 */
const sum = xs =>
xs.reduce((acc, x) => acc.concat(x), Sum.empty());

const all = xs =>
xs.reduce((acc, x) => acc.concat(x), All.empty());

console.log('Example 8:', sum([Sum(1), Sum(2), Sum(3)]).toString());
console.log('Example 8:', sum([]).toString());

console.log('Example 8:', all([All(true), All(false)]).toString());
console.log('Example 8:', all([]).toString());
