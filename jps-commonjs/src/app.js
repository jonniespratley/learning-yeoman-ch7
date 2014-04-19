//Require modules
var core = require('./module-core').core;

//Create instance
var app = new core({
	name: 'My App',
	extension: require('./module-extension').extension
});


//Listen for init event
app.on('init', function (instance) {
	console.log('app.init.callback');
});

app.on('save', function (obj) {
	console.log('saved', obj);
});


//Create
app.save({id: null, title: 'Test Title'});
app.update({id: 1, title: 'Updated Title'});
app.read({id: 1});
app.destroy({id: 1});
app.init();


var https = require('https');

https.get('https://encrypted.google.com/', function (res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);

	res.on('data', function (d) {
	//	process.stdout.write(d);
	});

}).on('error', function (e) {
	console.error(e);
});