var http = require('http'),
	fs = require('fs');

//Simple server push implementation
var deferred = require('deferred');

var delay = function (fn, timeout) {
	return function () {
		var def = deferred(), self = this, args = arguments;

		setInterval(function () {
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
server.on('request', function (req, res) {
	res.writeHead('200', {
		'content-type': 'text/html'
	});
	return res.end(socketFile);
});

server.listen(process.env.PORT, process.env.IP);


/**
 * Simple socket.io server
 * @type {*|http.Server}
 */
var io = require('socket.io').listen(server);
var clients = [];

io.sockets.on('connection', function (socket) {
	console.log('Client connected');


	clients.push(socket);

	io.sockets.emit('this', { will: 'be received by everyone'});

	socket.on('disconnect', function () {
		io.sockets.emit('user disconnected');
	});


	socket.emit('msg', {
		datetime: new Date(),
		message: "Welcome " + socket.id + " your the #" + clients.length + " socket."
	});

	//Send custom event to client
	socket.on('msgEvent', function (data, fn) {
		console.log('Client message', data);
		fn({
			datetime: new Date(),
			message: 'You sent ' + data
		});
	});

	socket.on('set nickname', function (name) {
		socket.set('nickname', name, function () {
			socket.emit('ready');
		});
	});

	socket.on('msg', function () {
		socket.get('nickname', function (err, name) {
			console.log('Chat message by ', name);
		});
	});


	//Setup auto push after interval
	var delayedSocketPush = delay(function (msg) {
		socket.emit('msg', {
			datetime: new Date(),
			message: msg,
			from: 'server'
		});
	}, 2500);


	var resultPromise = delayedSocketPush('Here is some streaming data....');

	resultPromise(function (value) {

	});


});

