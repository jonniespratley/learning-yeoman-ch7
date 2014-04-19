/* global  exports */

//Require modules
var utils = require('util');
var events = require('events');

//core module
function core(options) {

	//Invoke the EventEmitter
	events.EventEmitter.call(this);

	this.options = options;
	this.name = 'core module';
	this.extension = this.options.extension ? this.options.extension : {};

	//Initialize the module
	this.emit('init', this);
	utils.log('core.init()', this.options);

	//Call method which will call method on extension if there
	var call = function () {
		//Log
		utils.log(this.extension.hasOwnProperty([arguments[0]]), arguments[0], arguments);

		//emit
		this.emit(arguments[0], arguments);

		//check
		if (this.extension.hasOwnProperty([arguments[0]])) {

			//invoke
			this.extension[arguments[0]].call(this.extension[arguments[1]]);
		} else {

			//error
			throw new Error('You need to provide an extension!');
		}
	};


	/**
	 * Save handles creating or updating a new object.
	 * It will invoke the update method only if an objects
	 * id property exists and is not null.
	 * @param args
	 */
	this.save = function (args) {
		call('save', args);
	};

	this.read = function (args) {
		call('read', args);
	};

	this.update = function (args) {
		call('update', args);
	};

	this.destroy = function (args) {
		call('destroy', args);
	};

}



//Make core inherit all of EventEmitter properties/methods
utils.inherits(core, events.EventEmitter);


console.log(module.id);

//Make public
exports.core = core;