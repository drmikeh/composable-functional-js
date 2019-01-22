const Left = x => ({
    map: f => Maybe(f(x)),
    fold: (f, g) => f(x), // exec the Left function
    toString: () => `Left(${x})`
});

const Right = x => ({
    map: f => Right(x), // f is ignored!
    fold: (f, g) => g(x), // exec the Right function
    toString: () => `Right(${x})`
});

const Maybe = x => x != null ? Left(x) : Right(null);

module.exports = {
    Left,
    Right,
    Maybe
};
