//Require modules
var core = require('./dist/module-core').core;

//Create instance
var app = new core({
	name: 'My App',
	extension: require('./dist/module-extension').extension
});
app.init();

//Listen for init event
app.on('init', function (instance) {
	console.log('app.init.callback');
});

//Listen for save event
app.on('save', function (obj) {
	console.log('saved', obj);
});


//Create
app.save({id: null, title: 'Test Title'});
app.update({id: 1, title: 'Updated Title'});
app.read({id: 1});
app.destroy({id: 1});


/****
 *
 *
 * JPS-CMS test
 * @type {exports.DS|*}
 */
var cms = require('./dist/jps-cms').cms;

//Create instance
var _cms = new cms({
	endpoint: 'http://localhost:8181',
	adapter: 'http'
});

_cms.read('posts', {_id:1});

















