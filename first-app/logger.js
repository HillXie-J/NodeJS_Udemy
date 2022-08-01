const EventEmitter = require('events');
// const emitter = new EventEmitter();



/* console.log(__filename);
console.log(__dirname);
 */
var url = 'http://mylogger.io/log';

const test = '';


class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', {id: 1, url: 'http://'});
    }
}


/* function log(message) {
    console.log(message);
    emitter.emit('messageLogged', {id: 1, url: 'http://'});
} */


function log2(message) {
    console.log('log2');
}

module.exports = Logger;
// module.exports = log2;



