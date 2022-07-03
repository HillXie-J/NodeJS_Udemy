const log = require('./logger');

function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Test');


console.log(module);
console.log(log);

log('message');