/**
 * LazyBox - Delay evaluation untile fold is called
 * 
 * A variety of types, such as such as promises, observables, and streams,
 * define map to apply a function instead of a concrete value.
 * Thus we have composition and lazy evaluation.
 */
const LazyBox = g => ({
    fold: f => f(g()),
    map: f => LazyBox(() => f(g())),
    toString: () => `LazyBox(${g})`
});

const LazyBoxVerbose = g => ({
    fold: f => f(g()),
    map: f => LazyBoxVerbose(() => {
        console.log('  LazyBoxVerbose map:', f);
        const r = f(g());
        console.log(`    the result is (${r.toString()}, ${typeof(r)}) after applying f:`, f);
        return r;
    }),
    toString: () => `LazyBoxVerbose(${g})`
});

module.exports = {
    LazyBox,
    LazyBoxVerbose
};
