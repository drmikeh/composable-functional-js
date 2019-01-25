/**
 * This was taken from the article:
 *    [Functional programming: Monads made clear - in javascript](https: //blog.klipse.tech/javascript/2016/08/31/monads-javascript.html)
 */

+function() {
    // These functions take one number as input and return one number as output,
    // making them composable: you can use the output of one as the input to the next.
    const sine = x => Math.sin(x);
    const cube = x => x * x * x;

    // let's compose them
    const sineCubed = x => cube(sine(x));

    // Let’s create a function to encapsulate function composition.
    const compose = (f, g) => x => f(g(x));
    const sineOfCube = compose(cube, sine);
    const x = 1.22;
    console.log('sineOfCube:', sineOfCube(x));
}();

// Now, we decide that we need to debug these functions, and we want to log the fact
// that they have been called.

+function() {
    // Logging with pure functions:
    const sine = x => [ Math.sin(x), `sine was called with value ${x}.`];
    const cube = x => [ x * x * x, `cube was called with value ${x}.`];
    
    // But we now find, to our horror, that these functions don’t compose:
    const compose = (f, g) => x => f(g(x));
    console.log('BROKEN:', compose(sine, cube)(3));

    /* This is broken in two ways:
        (1) sine is trying to calculate the sine of an array, which results in null
        (2) we’re losing the debugging information from the call to cube

       We’d expect the composition of these functions to return the sine of the
       cube of x, and a string stating that both cube and sine were called.

       A simple composition won’t work here because the return type of cube (an array)
       is not the same as the argument type to sine (a number).
    */

    /* A little more glue is required. We could write a function to compose these
       ‘debuggable’ functions: it would break up the return values of each function
       and stitch them back together in a meaningful way
    */
    const composeDebuggable = (f, g) => (x) => {
        const [y, m] = g(x),
              [z, n] = f(y);
        return [z, (m + ' ' + n).trim()];
    };
    console.log('composeDebuggable:', composeDebuggable(sine, cube)(3));

    /* We’ve composed two functions that take a number and return a (number, string)
       pair, and created another function with the same signature, meaning it can be
       composed further with other debuggable functions.
    */
}();

/* Let's try to simplify things. We really want to use the original `compose` function
   but it doesn't work because our original `sine` and `cube` functions have the signature:
      Number --> (Number, String)
   but we need them to have the signature:
      (Number, String) --> (Number, String)

   We could manually change them to have the desired signature, but that would be a lot
   of boilerplate code for all of the debuggable functions we might ever write.

   Far better to let each function just do its job, and provide one tool to coerce the
   functions into the desired format. We’ll call this tool `bind`, and its job is to
   take a
       Number           -> (Number,String)  function and return a
       (Number, String) -> (Number, String) function.
*/

+function() {
    // Logging with pure functions:
    const sine = x => [Math.sin(x), `sine was called with value ${x}.`];
    const cube = x => [x * x * x, `cube was called with value ${x}.`];
    // our original compose function
    const compose = (f, g) => x => f(g(x));

    // Let’s write `bind` in javascript
    const bind = f => function(tuple) {
        const [x, m] = tuple,
              [y, n] = f(x);
        return [y, (m + ' ' + n).trim()];
    };

    // We can use this to convert our functions to have composable signatures,
    // and then compose the results.
    const f = compose(bind(sine), bind(cube));
    console.log('bind:', f([3, '']));

    /*  But now we have to wrap our number into an array, i.e. [3, ''], to get things started.
        We would rather just pass in a number.
        As well as converting functions, we need a way of converting values to acceptable types,
        that is we need the following function:

            unit :: Number -> (Number, String)
       
        The role of `unit` is to take a value and wrap it in a basic container that the
        functions can consume. For our debuggable functions, this just means pairing the number
        with a blank string:
    */
    
    const unit = x => [x, ''];
    console.log('unit:', f(unit(3)));
    
    // We can also compose f and unit, like this:
    console.log('unit with compose:', compose(f, unit)(3));

    // This unit function also lets us convert any function into a debuggable one, by converting
    // its return value into an acceptable input for debuggable functions. For instance:
    const round = x => Math.round(x);
    const roundDebugA = x => unit(round(x));
    console.log('roundDebugA:', roundDebugA(12.34));   // works but is missing the debug message

    // or even better:
    // const roundDebugMessage = ([x, s]) => [x, `round was called with value ${x}.`];
    // const roundDebugMessage = bind(x => [x, `round was called with value ${x}.`]);
    // const roundDebugB = compose(roundDebugMessage, roundDebugA);

    const roundDebugMessage = x => [x, `round was called with value ${x}.`];
    const roundDebugB = compose(bind(x => unit(round(x))), compose(bind(roundDebugMessage), unit));
    console.log('roundDebugB:', roundDebugB(12.34));

    /* This type of conversion, from a 'plain' function to a debuggable one, can be abstracted
       into a function we’ll call `lift`.

          lift :: (Number -> Number) -> (Number -> (Number, String))

       The type signature says that lift takes a function with signature Number -> Number
       and returns a function with signature Number -> (Number,String).
    */

    // `lift` functions in JavaScript
    const unitBind = f => compose(bind(f), unit);
    const applyUnitBind = f => bind(x => unit(f(x)));

    // Let’s try this out with our existing functions and see if it works:
    // const roundDebugC = compose(bind(x => unit(round(x))), liftUnit(roundDebugMessage));
    const roundDebugC = compose(applyUnitBind(round), unitBind(roundDebugMessage));
    console.log('roundDebugC:', roundDebugC(12.34));

    const composableCube = unitBind(cube);
    console.log('composableCube:', composableCube(2.789));

    const f2 = compose(compose(bind(roundDebugA), bind(roundDebugMessage)), composableCube);
    console.log('LIFT A:', f2(2.789));

    const f3 = compose(bind(cube), roundDebugC);
    console.log('LIFT B:', f3(2.789));
}();
