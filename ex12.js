const { task } = require('folktale/concurrency/task');

/**
 * Example 12 Capture Side Efects in a Task
 */
const launchMissiles = () =>
  task(resolver => {
    console.log('Example 12: launch missiles!')
    resolver.resolve('missiles')
  });

const app = launchMissiles().map(x => x + '!')

app
  .map(x => x + '!')
  .run()
  .listen({
    onCancelled: () => { console.log('the task was cancelled'); },
    onRejected: error => { console.log('Example 12: ERROR:', error) },
    onResolved: value => { console.log(`Example 12: The value is ${value}`) }
  });
