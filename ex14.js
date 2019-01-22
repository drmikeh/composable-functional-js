/**
 * Example 14 - You've been using Functors
 * 
 * A Functor is a type that has a `map` method that obeys 2 laws:
 *   (1) fx.map(f).map(g) == fx.map(x => g(f(x)))
 *   (2) fx.map(id) == id(fx)
 */
const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    toString: () => `Box(${x})`
});

// Demonstrating Law (1)
const res1 = Box('Dr. Mike Hopper')
    .map(s => s.substr(4, 4))
    .map(s => s.toUpperCase())

const res2 = Box('Dr. Mike Hopper')
    .map(s => s.substr(4, 4).toUpperCase())

console.log(res1.toString(), res2.toString());

/**
 * NOTE: you can substitute for Box above any of the following Functors:
 *   { Left, Right, Maybe, List, Map, Task }
 */

// Demonstrating Law (2)
const id = x => x;
const res3 = Box('crayons').map(id);
const res4 = id(Box('crayons'));

console.log(res3.toString(), res4.toString());
