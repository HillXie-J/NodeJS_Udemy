/* const EventEmitter = require('events');
const emmiter = new EventEmitter();

emmiter.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});

emmiter.on('messageLogging', (arg) => {
    console.log('Listener called', arg);
});
 */
// emmiter.emit('messageLogged', {id: 1, url: 'http://'});

// emmiter.emit('messageLogging', 'message');

const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogged', (arg) => {
    console.log('Listener called', arg);
});


logger.log('message');
