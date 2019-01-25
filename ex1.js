const Box = require('./Box');

/**
 * Example 1 - Create linear data flow with container style types (Box)
 */
const nextCharForNumberString = str => (
    Box(str)
    .map(s => s.trim())
    .map(r => parseInt(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase())
);
const result = nextCharForNumberString('  64 ');
console.log('Example 1:', result);
