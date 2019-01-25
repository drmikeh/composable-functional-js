const { Maybe } = require('./LeftRightMaybe');

/**
 * Example 3 - Enforce a null check with composable code branching using Maybe
 */
const findColor = name => (
    Maybe({
        red: '#ff4444',
        blue: '#3b5998',
        yellow: '#fff68f'
    }[name])
);

const res = findColor('blue')
    .map(c => c.slice(1))
    .map(c => c.toUpperCase())
    .fold(x => x, e => 'no color');

console.log('Example 3:', res);
