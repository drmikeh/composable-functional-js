/**
 * Example 13 - Use Task for Asynchronous Actions
 */
const { task } = require('folktale/concurrency/task');
const fs = require('fs');

// NOTE: libraries like `futurize` can automate this setup
const readFile = (filename, enc) => (
    task(resolver => (
        fs.readFile(filename, enc, (err, contents) => {
            if (err) throw err;
            resolver.resolve(contents);
        })
    ))
);
const writeFile = (filename, contents) => (
    task(resolver => (
        fs.writeFile(filename, contents, (err, success) => {
            if (err) throw err;
            resolver.resolve(success);
        })
    ))
);

// Now we reap the benefits of cleaner code:
const app = readFile('config.json', 'utf-8')
    .map(contents => contents.replace(/8/g, '6'))
    .chain(contents => writeFile('config1.json', contents));

app.run().listen({
    onCancelled: () => { console.log('the task was cancelled'); },
    onRejected: error => { console.log('ERROR:', error) },
    onResolved: value => { console.log('Success!') }
});
