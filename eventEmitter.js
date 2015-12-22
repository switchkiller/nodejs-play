var events = require('events');
var eventEmitter = new events.EventEmitter();

var listner1 = function listner1(){
  console.log("This is listner1");
}

var listner2 = function listner2(){
  console.log("This is listner2");
}

eventEmitter.addListener('connection', listner1);
eventEmitter.on('connection', listner2);

var eventListnerCount = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListnerCount + ' Listner(s) listening to the connection event');

eventEmitter.emit('connection');

eventEmitter.removeListener('connection', listner1); // listner1 connection removed.
console.log("listner1 will not listen now.");

eventEmitter.emit('connection');
eventListnerCount = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eventListnerCount + ' Listner(s) listening to the connection event');

console.log("Program-End");
