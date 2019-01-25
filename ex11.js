const Box = require('./Box');
const { LazyBox, LazyBoxVerbose } = require('./LazyBox');

/**
 * Example 11 - Delay Evaluation with LazyBox 
 */
const r1 = Box('   42  ')
    .map(s => s.trim())
    .map(s => new Number(s))
    .fold(n => n + 1);
console.log('Example 11:', r1.toString());

const r2 = LazyBox(() => '   42  ')
    .map(s => s.trim())
    .map(s => new Number(s))
    .map(n => n + 1)
    .fold(n => n); // fold makes things happen!
console.log('Example 11:', r2);

const r3 = LazyBoxVerbose(() => '   42  ')
    .map(s => s.trim())
    .map(s => new Number(s))
    .map(n => n + 1)
    .fold(n => n); // fold makes things happen!
console.log('Example 11:', r3);
