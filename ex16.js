const Box = require('./Box');

/**
 * Example 16 = You've been using Monads
 *   { Box, Either, Task, and List } are all monads.
 * Monads have an `of` method and a `chain` method.
 *   - `of` puts a value into a Monad
 *   - `chain` (aka `flatMap` or `bind`)
 */

/*
httpGet('/user')
    .map(user =>
        httpGet('/comments/${user.id}')
        .chain(comments =>
            updateDOM(user, comments))) // Task(Task(Task(DOM)))  <== Russian nesting dolls
*/

const join = m => m.chain(x => x);  // return the inner type
 
const m1 = Box(Box(Box(3)));

// 1st Law of Monads:
//   join(m.map(join) == join(join(m)))
const r1 = join(m1.map(join));
const r2 = join(join(m1));

console.log(r1.toString(), r2.toString());

// 2nd Law of Monads
//   join(Box.of(m)) == join(m.map(Box.of))
const m2 = Box('wonder');

const r3 = join(Box.of(m2));
const r4 = join(m2.map(Box.of));

console.log(r3.toString(), r4.toString());
