const Left = x => ({
    map: f => Maybe(f(x)),
    chain: f => f(x),
    ap: maybe => maybe.map(x),
    fold: (f, g) => f(x),           // exec the Left function
    toString: () => `Left(${x})`
});
Left.of = x => Left(x);

const Right = x => ({
    map: f => Right(x),             // f is ignored!
    chain: f => x,                  // f is ignored!
    fold: (f, g) => g(x),           // exec the Right function
    toString: () => `Right(${x})`
});
Right.of = x => Right(x);

const Maybe = x => x != null ? Left(x) : Right(null);
Maybe.of = Maybe;

const $ = selector => Maybe.of( {selector, height: 10} );

// imperative code (nesting)
+function() {
    const getScreenSize = (screen, head, foot) => screen - (head.height + foot.height);
    const res = $('header').chain(header =>
                    $('footer').map(footer =>
                        getScreenSize(800, header, footer)
                    )
                );
    console.log(res.toString());
}();

+function() {
    const getScreenSize = screen => head => foot => screen - (head.height + foot.height);
    const res = Maybe.of(getScreenSize(800))
        .ap($('header'))
        .ap($('footer'))
    console.log(res.toString());
}();

// using Applicative Functors (chaining)
// This is how we apply multiple functors as arguments to a function.
+function() {
    const getScreenSize = screen => head => foot => screen - (head.height + foot.height);
    const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);
    const res = liftA2(getScreenSize(800), $('header'), $('footer'));
    console.log(res.toString());
}();
