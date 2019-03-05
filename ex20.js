const { List } = require('immutable-ext');

// imperative code
+function() {
    for (let x in xs) {
        for (let y in ys) {
            for (let z in zs) {
                // do something here
            }
        }
    }
}

+function() {
    const res = List.of(x => x).ap(List([1, 2, 3]));
    console.log(res.toString());
}();

// Use an Applicative Functor via `List` to do a loop inside of a loop
// This is an example of a List Comprehension
+function() {
    const merch = () =>
        List.of(item => size => color => `${item}-${size}-${color}`)
        .ap(List(['teeshirt', 'sweater']))
        .ap(List(['large', 'medium', 'small']))
        .ap(List(['blue', 'green']));
    const res = merch();
    console.log(res.toJS());
}();
