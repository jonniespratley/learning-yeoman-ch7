'use strict';

var DS = require('../dist/DS.js').DS;

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

var _ds = null;

exports['DS'] = {
	setUp: function (done) {

		_ds = new DS({
			adapter: 'Default',
			host: 'localhost',
			port: 8181
		});

		// setup here
		done();
	},
	'findOne': function (test) {
		test.equal(_ds.findOne('posts', 1), 'findOne posts 1', 'should findOne item from collection with id 1.');
		test.done();
	},
	'findAll': function (test) {
		test.equal(_ds.findAll('posts'), 'findAll posts', 'should findAll from collection.');
		test.done();
	},
	'createRecord': function (test) {

		var expected = {title: 'test post'};
		var newRecord = _ds.createRecord('posts', expected);


		test.equal(newRecord, expected, 'should create and return object in collection.');
		test.done();
	}
};
