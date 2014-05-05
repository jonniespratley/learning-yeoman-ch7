var http = require('http'), fs = require('fs');

//Simple server push implementation
var deferred = require('deferred');

var delay = function(fn, timeout) {
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
	};
};
/**
 * Simple http client server
 */
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
var io = require('socket.io').listen(server);
var clients = [];

var Socket = {
	clients : [],
	messages : [],
	debug : true,
	connect : function() {

	},
	send : function(channel, data) {

	},
	set : function(name, value) {

	},
	get : function(name) {

	}
};

io.sockets.on('connection', function(socket) {
	console.log('Client connected');

	clients.push(socket);

	io.sockets.emit('this', {
		will : 'be received by everyone'
	});

	socket.on('disconnect', function() {
		io.sockets.emit('user disconnected');
	});

	socket.emit('msg', {
		datetime : new Date(),
		id : socket.id,
		message : "Welcome " + socket.id + " your the #" + clients.length + " socket."
	});

	//Send custom event to client
	socket.on('msgEvent', function(data, fn) {
		console.log('Client message', data);
		fn({
			id : socket.id,
			datetime : new Date(),
			message : data
		});
	});

	socket.on('set nickname', function(name) {
		socket.set('nickname', name, function() {
			socket.emit('ready');
		});
	});

	socket.on('msg', function() {
		socket.get('nickname', function(err, name) {
			console.log('Chat message by ', name);
		});
	});
	//Setup auto push after interval
	var delayedSocketPush = delay(function(msg) {
		msg = {
			x : (new Date()).getTime(),
			y : Math.random()
		};
		socket.emit('msg', {
			datetime : new Date(),
			message : msg,
			id : 'Server'
		});
	}, 1000);
	var resultPromise = delayedSocketPush();

	resultPromise(function(value) {

	});
});
