const util = require('util')

const person = {
   name: 'Mike',
   hobbies: ['chess', 'photography', 'cycling'],
   age: 52,
   toString: () => `Person(${this.name}, ${this.age})`
};

console.log('A:', person);

console.log('\n');
console.dir(person);

console.log('\n');
console.log('C:', util.toString(person, false, null, true));
