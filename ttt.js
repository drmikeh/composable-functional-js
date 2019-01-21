const util = require('util')

const person = {
   name: 'Mike',
   hobbies: ['chess', 'photography', 'cycling'],
   age: 52,
   inspect: () => `Person(${this.name}, ${this.age})`
};

console.log('A:', person);

console.log('\n');
console.dir(person);

console.log('\n');
console.log('C:', util.inspect(person, false, null, true));
