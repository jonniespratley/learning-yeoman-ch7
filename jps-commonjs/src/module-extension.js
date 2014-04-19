/* globals exports require */

//Require modules
var utils = require('util');
var events = require('events');

//extension module
var extension = {
	name: 'module extension',
	init: function () {
		console.log('extension.init()');
	},
	save: function (args) {
		console.log('extension.save');
	}
};

//Make public
exports.extension = extension;