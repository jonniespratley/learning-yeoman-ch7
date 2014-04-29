DS = require('./DS')
events = require('events')
utils = require('util')


class DSMySQLAdapter extends DS
	@name: 'MySQLAdapter Adapter'
	@options:
		host: 'localhost'
		port: 27017
	constructor:(@options) ->
		#//Invoke the EventEmitter
		events.EventEmitter.call(@);
		console.log('mysql-adapter')



#Make core inherit all of EventEmitter properties/methods
utils.inherits(DSMySQLAdapter, events.EventEmitter);


#Make public
exports.DSMySQLAdapter = DSMySQLAdapter;