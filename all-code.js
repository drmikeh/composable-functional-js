// Box is the identity functor!
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
});

/**
 * Example 1
 */
console.log('\n=== Example 1 ===');
+function () {
  const nextCharForNumberString = str => (
    Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())
  );
  const result = nextCharForNumberString('  64 ');
  console.log(result);
}();

/**
 * Example 2
 */
console.log('\n=== Example 2 ===');
+function() {
  const moneyToFloat = str =>
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r));

  const percentToFloat = str =>
    Box(str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number * 0.01);

  const applyDiscount = (price, discount) =>
    moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
      .fold(savings =>
        cost - cost * savings));

  const result = applyDiscount('$5.00', '20%');
  console.log(result);
}();

/**
 * Example 3
 */
console.log('\n=== Example 3 ===');
+function() {
  const Right = x =>
  ({
    map: f => Right(f(x)),
    fold: (f, g) => g(x),           // exec the right function
    inspect: () => `Right(${x})`
  });

  const Left = x =>
  ({
    map: f => Left(x),              // f is ignored!
    fold: (f, g) => f(x),           // exec the left function
    inspect: () => `Left(${x})`
  });

  const fromNullable = x =>
    x != null ? Right(x) : Left(null)

  const findColor = name =>
    fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name])

  const res = findColor('blue')
              .map(c => c.slice(1))
              .map(c => c.toUpperCase())
              .fold(e => 'no color', x => x)

  console.log(res)
}();

/**
 * Example 4
 */
// SETUP: fake fs
//==========
console.log('\n=== Example 4 ===');
+function() {
  const fs = {
    readFileSync: name => {
      if(name === 'config.json') {
        return JSON.stringify({port: 8888})
      } else {
        throw('missing file!')
      }
    }
  }

  const Right = x =>
  ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`
  })

  const Left = x =>
  ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left(${x})`
  })

  const fromNullable = x =>
    x != null ? Right(x) : Left(null)
    
  const tryCatch = f => {
    try {
      return Right(f())
    } catch (e) {
      return Left(e)
    }
  }

  const getPort = () =>
    tryCatch(() => fs.readFileSync('config.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(e => 3000, c => c.port)

  const result = getPort()
  console.log(result)
}();

/**
 * Example 6 - Semigroups
 * A semigroup is a type with a concat method that has
 * the associative property.
 */
console.log('\n=== Example 6 ===');
const First = x =>
({
  x,
  concat: _ => First(x),
  inspect: () => `First(${x})`,
  toString: () => `First(${x})`
});
// All is a logical AND boolean data type
const All = x =>
({
  x,
  concat: ({x: y}) => All(x && y),
  inspect: () => `All(${x})`,
  toString: () => `All(${x})`
});
const Sum = x =>
({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: () => `Sum(${x})`,
  toString: () => `Sum(${x})`
});
+function() {
  const res1 = Sum(1).concat(Sum(2))
  console.log(res1.toString())

  const res2 = All(false).concat(All(true))
  console.log(res2.toString())

  const res3 = First("blah")
    .concat(First("ice cream"))
    .concat(First('meta programming'))
  console.log(res3.toString())
}();


/**
 * Example 7 - Semigroup Examples
 * This example shows that if a data structure
 * is entirely made up of Semigroups
 * then it will be a Semigroup itself.
 */
console.log('\n=== Example 7 ===');
require("immutable");
const { Map } = require("immutable-ext");
+function() {
  const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] })
  const acct2 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(2), friends: ['Gatsby'] })
  const res = acct1.concat(acct2);
  console.log(res.toString());
}();

/**
 * Example 8 - Monoids
 * 
 * A Monoid is a semigroup with a neutral / identity value
 */
console.log('\n=== Example 8 ===');
Sum.empty = () => Sum(0);    // zero is the identify value for addition
All.empty = () => All(true); // true is the identify value for logical AND

+function() {
  const sum = xs =>
    xs.reduce((acc, x) => acc.concat(x), Sum.empty());

  const all = xs =>
    xs.reduce((acc, x) => acc.concat(x), All.empty());

  console.log(sum([Sum(1), Sum(2), Sum(3)]).toString());
  console.log(sum([]).toString());

  console.log(all([All(true), All(false)]).toString());
  console.log(all([]).toString());
}();

/**
 * Example 9 - A Curated Collection of Monoids and Their Uses
 */
console.log('\n=== Example 9 ===');
const Product = x => ({
  x,
  concat: ({x: y}) => Product(x * y),
  inspect: () => `Product(${x})`,
  toString: () => `Product(${x})`
});
Product.empty = () => Product(1); // one is the identify value for multiplication

console.log(Product(2).concat(Product(3).concat(Product(4))).toString());

// Any is a logical OR boolean data type
const Any = x =>
({
  x,
  concat: ({x: y}) => Any(x || y),
  inspect: () => `Any(${x})`,
  toString: () => `Any(${x})`
});
Any.empty = () => Any(false); // false is the identify value for logical AND

// Max is a logical OR boolean data type
const Max = x =>
({
  x,
  concat: ({x: y}) => Max(x > y ? x : y),
  inspect: () => `Max(${x})`,
  toString: () => `Max(${x})`
});
Max.empty = () => Max(-Infinity); // -Infinity is the identify value for Max

console.log(Max(2).concat(Max(4).concat(Max(3))).toString());

const Min = x =>
({
  x,
  concat: ({x: y}) => Min(x < y ? x : y),
  inspect: () => `Min(${x})`,
  toString: () => `Min(${x})`
});
Min.empty = () => Min(Infinity); // Infinity is the identify value for Min

console.log(Min(2).concat(Min(4).concat(Min(3))).toString());

+function() {
  const Right = x => ({
    fold: (f, g) => g(x),
    map: f => Right(f(x)),
    concat: o => o.fold(e => Left(e), r => Right(x.concat(r))),
    inspect: () => `Right(${x})`,
    toString: () => `Right(${x})`
  });
  const Left = x => ({
    isLeft: true,
    fold: (f, g) => f(x),
    map: f => Left(x),
    concat: o => Left(x),
    inspect: () => `Left(${x})`,
    toString: () => `Left(${x})`
  });
  const fromNullable = x => x != null ? Right(x) : Left(null);

  const { List } = require("immutable");

  const stats = List.of(
    { page: 'Home', views: 40 },
    { page: 'About', views: 10 },
    { page: 'Blog', views: 4 },
  );
  console.log(stats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum.empty())).toString());
  const updatedStats = stats.push({ page: 'Help', views: null });
  console.log(updatedStats.foldMap(x => fromNullable(x.views).map(Sum), Right(Sum.empty())).toString());

  const First = either => ({
    fold: f => f(either),
    concat: o => either.isLeft ? o : First(either)
  });
  First.empty = () => First(Left());

  const find = (xs, f) =>
    List(xs)
    .foldMap(x => First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x);

    const r = find([3, 4, 5, 6, 7], x => x > 4);
    console.log(r.toString());
}();

/**
 * Example 10 - Unbox types with foldMap
 */
console.log('\n=== Example 10 ===');
+function() {
  const { Map, List } = require("immutable");

  // -----------------------------
  // Sum monoid
  const Sum = x =>
  ({
    x,
    concat: ({x: y}) => Sum(x + y),
    inspect: () => `Sum(${x})`
  });
  Sum.empty = () => Sum(0);

  // we can reduce an Array of Sums using concat
  const res1 = [Sum(1),Sum(2),Sum(3)]
              .reduce((acc, x) => acc.concat(x), Sum.empty())

  // we can Map to the Sum monoid and then fold
  const res2 = Map({brian: 10, sara: 2})
              .map(Sum)
              .fold(Sum.empty())

  // foldMap does the mapping and the folding for us
  const res3 = List.of(1,2,3)
              .foldMap(Sum, Sum.empty())

  console.log("result 1: ", res1.inspect());
  console.log("result 2: ", res2.inspect())
  console.log("result 3: ", res3.inspect())
}();

