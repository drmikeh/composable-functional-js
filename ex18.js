const Box = require('./Box');

/**
 * Example 18 - Applicative Functors for Multiple Arguments
 */

// let's add an `ap` (apply) method to Box
+function() {
    const res = Box(x => x + 1).ap(Box(2));
    console.log('Example 18:', res.toString());   // Box(3)
}();

/**
 * applicative functors have an `ap` method where
 *     F(x).map(f) == F(f).ap(F(x))
 * i.e.
 *     a functor holding a value and then mapping a function is equivalent to
 *     a functor holding a function and then applying a value!
 */

+function() {
    const res = Box(x => y => x + y).ap(Box(2));
    console.log('Example 18:', res.toString());   // Box(y => x + y)
    const res2 = res.ap(Box(3));
    console.log('Example 18:', res2.toString());  // Box(5)
}();

+function() {
    const add = x => y => x + y;
    const res1 = Box(add).ap(Box(2)).ap(Box(3));
    console.log('Example 18:', res1.toString()); // Box(5)

    // lift Applicative 2 arguments
    // const liftA2 = (f, fx, fy) => F(f).ap(fx).ap(fy);
    // is the same as:
    const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);
    const res2 = liftA2(add, Box(2), Box(4));
    console.log('Example 18:', res2.toString());
}();

+function() {
    const add3 = x => y => z => x + y + z;

    const res2 = Box(add3).ap(Box(3)).ap(Box(4)).ap(Box(5));
    console.log('Example 18:', res2.toString());

    // is the same as:

    const liftA3 = (f, fx, fy, fz) => fx.map(f).ap(fy).ap(fz);
    const res = liftA3(add3, Box(3), Box(4), Box(5));
    console.log('Example 18:', res.toString());


    // liftA provides a way to apply multiple arguments to a function in a generic way.
}();
