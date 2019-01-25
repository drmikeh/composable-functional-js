/**
 * Example 4
 */

// SETUP: mock fs
const fs = {
    readFileSync: name => {
        if (name === 'config.json') {
            return JSON.stringify({port: 8888})
        } else {
            throw('missing file!')
        }
    }
};

const Left = x => ({
    chain: f => f(x),           // apply f
    map: f => Left(f(x)),       // apply f
    fold: (f, g) => f(x),
    toString: () => `Left(${x})`
});

const Right = x => ({
    chain: f => Right(x),         // ignore f
    map: f => Right(x),           // ignore f
    fold: (f, g) => g(x),
    toString: () => `Right(${x})`
});

const fromNullable = x => x != null ? Left(x) : Right(null);

const tryCatch = f => {
    try {
        return Left(f());
    } catch (e) {
        return Right(e);
    }
}

const getPort = () =>
    tryCatch(() => fs.readFileSync('config.json'))
        .chain(c => tryCatch(() => JSON.parse(c)))
        .fold(c => c.port, e => 3000);

const result = getPort();
console.log('Example 4:', result);
