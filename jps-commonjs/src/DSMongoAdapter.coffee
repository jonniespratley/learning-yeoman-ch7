DS = require('./DS')
events = require('events')
utils = require('util')


class DSMongoAdapter extends DS
  @name: 'MongoDB Adapter'
  @options:
    host: 'localhost'
    port: 27017
  constructor:(@options) ->
    #//Invoke the EventEmitter
    events.EventEmitter.call(@);
    console.log('mongo-adapter') 
    


#Make core inherit all of EventEmitter properties/methods
utils.inherits(DSMongoAdapter, events.EventEmitter);


#Make public
exports.DSMongoAdapter = DSMongoAdapter;