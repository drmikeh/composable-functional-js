const { List } = require('immutable');
const { Map } = require("immutable-ext");
const { Sum } = require('./FirstAllSum');

/**
 * Example 9 - A Curated Collection of Monoids and Their Uses
 */

// Product - simple multiplication
const Product = x => ({
  x,
  concat: ({x: y}) => Product(x * y),
  toString: () => `Product(${x})`
});
Product.empty = () => Product(1); // one is the identify value for multiplication

console.log('Example 9:', Product(2).concat(Product(3).concat(Product(4))).toString());


// Any - a logical OR boolean data type
const Any = x =>
({
  x,
  concat: ({x: y}) => Any(x || y),
  toString: () => `Any(${x})`
});
Any.empty = () => Any(false); // false is the identify value for logical AND


// Max
const Max = x =>
({
  x,
  concat: ({x: y}) => Max(x > y ? x : y),
  toString: () => `Max(${x})`
});
Max.empty = () => Max(-Infinity); // -Infinity is the identify value for Max

console.log('Example 9:', Max(2).concat(Max(4).concat(Max(3))).toString());

// Min
const Min = x =>
({
  x,
  concat: ({x: y}) => Min(x < y ? x : y),
  toString: () => `Min(${x})`
});
Min.empty = () => Min(Infinity); // Infinity is the identify value for Min

console.log('Example 9:', Min(2).concat(Min(4).concat(Min(3))).toString());

// Left with concat
const Left = x => ({
    fold: (f, g) => f(x),
    map: f => Left(f(x)),
    concat: o => o.fold(r => Left(x.concat(r)), e => Right(e)),
    toString: () => `Left(${x})`
});

// Right with concat
const Right = x => ({
    fold: (f, g) => g(x),
    map: f => Right(x),
    concat: o => Right(x),
    toString: () => `Right(${x})`
});

// Maybe
const Maybe = x => x != null ? Left(x) : Right(null);

const stats = List.of(
    { page: 'Home', views: 40 },
    { page: 'About', views: 10 },
    { page: 'Blog', views: 4 },
);

console.log('Example 9:', stats.foldMap(x => Maybe(x.views).map(Sum), Left(Sum.empty())).toString());
const updatedStats = stats.push({ page: 'Help', views: null });
console.log('Example 9:', updatedStats.foldMap(x => Maybe(x.views).map(Sum), Left(Sum.empty())).toString());

// First
const First = either => ({
    fold: f => f(either),
    concat: o => either.isLeft ? o : First(either)
});
First.empty = () => First(Right());

// find the first value that passes the test provided by `f`
const find = (xs, f) =>
List(xs)
    .foldMap(x => First(f(x) ? Left(x) : Right()), First.empty())
    .fold(x => x);

const r = find([3, 4, 5, 6, 7], x => x > 4);
console.log('Example 9:', r.toString());
