var http = require('http'), fs = require('fs');

//Simple server push implementation
var deferred = require('deferred');

/**
 * Simple http client server
 */
var utils = require('util');
var socketFile = fs.readFileSync(__dirname + '/socketio.html');
var server = http.createServer();
server.on('request', function(req, res) {
	res.writeHead('200', {
		'content-type' : 'text/html'
	});
	return res.end(socketFile);
});
var host = process.env.IP | 'localhost';
var port = process.env.PORT | 9000;

server.listen(port, host);

console.log('Started server at ' + host + ':' + port);

/**
 * Simple socket.io server
 * @type {*|http.Server}
 */
//var io = require('socket.io').listen(server);
var clients = [];

var Socket = {
	clients : [],
	messages : [],
	debug : true,
	io : null,
	/**
	 * Handle setting up the socket.io connection.
	 */
	listen : function(server) {
		this.server = server;
		
		Socket.io = require('socket.io').listen(server);
		Socket.io.sockets.on('connection', this.connect);
	},
	/**
	 * Handle managing the connections to clients.
	 */
	connect : function(socket) {
		console.log('Client connected');
		clients.push(socket);
		socket.on('msg', function() {
			socket.get('nickname', function(err, name) {
				console.log('Chat message by ', name);
			});
		});
		//Setup auto push after interval
		var delayedSocketPush = Socket.delay(function(msg) {
			msg = {
				x : (new Date()).getTime(),
				y : Math.random()
			};
			socket.emit('msg', {
				datetime : new Date(),
				message : msg,
				id : 'Server'
			});
		}, 500);
		var resultPromise = delayedSocketPush();

		resultPromise(function(value) {
			console.log(value);
		});
		
		Socket.io.sockets.emit('this', {
			will : 'be received by everyone'
		});

		socket.on('disconnect', function() {
			Socket.io.sockets.emit('user disconnected');
		});
		//Send custom event to client
		socket.on('msgEvent', function(data, fn) {
			
			
			console.log('Client message', utils.inspect(data, socket));
			fn({
				id : socket.id,
				datetime : new Date(),
				message : data
			});
		});
	},
	
	/**
	 * Handle setting up all event listeners
	 */
	initialize : function() {
		
	},
	/**
	 * Handle sending a message to the channel.
	 */
	send : function(channel, data) {
		return channel.emit('msg', data);
	},
	/**
	 * Handle setting the name/value on the channel.
	 */
	set : function(name, value) {
		socket.on('set ' + name, function(name) {
			socket.set(name, value, function() {
				socket.emit('ready');
			});
		});
	},
	/**
	 * Handle getting the name from the channel.
	 */
	get : function(name) {

	},
	delay : function(fn, timeout) {
		return function() {
			var def = deferred(), self = this, args = arguments;
			setInterval(function() {
				var value;
				try {
					value = fn.apply(self, args);
				} catch (e) {
					def.reject(e);
					return;
				}
				def.resolve(value);
			}, timeout);
			return def.promise;
		}
	}
};


Socket.listen(server);
