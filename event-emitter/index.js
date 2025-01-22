const EventEmitter = require('events');
const myFirstEmitter = new EventEmitter();

myFirstEmitter.on('greet' , (name) => {
    console.log("Calling webservice A => " + name);
});

myFirstEmitter.emit('greet' , 'Niraj');


