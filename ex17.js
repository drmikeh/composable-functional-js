/**
 * Example 17 - Build Curried Functions
 */

+function() {
    const add = (x, y) => x + y;
    const inc = y => add(1, y);
    const res = inc(2);
    console.log(res);
}();

+function() {
    const add = x => y => x + y;
    const inc = add(1);
    const res = inc(2);
    console.log(res);
}();

+function() {
    // const modulo = (dvr, dvd) => dvd % dvr;
    // const isOdd = dvd => modulo(2, dvd);
    const modulo = dvr => dvd => dvd % dvr;
    const isOdd = modulo(2);

    const filter = pred => xs => xs.filter(pred);  // hint: put the data last!
    const getAllOdds = filter(isOdd);
    const res = getAllOdds([1, 2, 3, 4, 5]);
    console.log(res);
}();

+function() {
    // currying helps us with function composition
    const replace = regex => repl => str => str.replace(regex, repl);
    const censor = replace(/[aeiou]/ig)('*');
    const res1 = censor('hello world');
    console.log(res1);

    // we can use composition to apply censor across an array!
    const map = f => xs => xs.map(f);
    const censorAll = map(censor);
    const res2 = censorAll(['I', 'love', 'functional', 'programming']);
    console.log(res2);
}();
