'use strict';

var cms = require( '../dist/jps-cms.js' ).cms;

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
var _cms = null;
var expected = null;
exports['cms'] = {
	setUp: function (done) {

		_cms = new cms( {
			adapter: 'http',
			endpoint: 'localhost:8181/api'
		} );

		expected = {_id: 1, title: 'Updated post'};

		// setup here
		done();
	},
	/**
	 * I verify that the cms can create a object.
	 * @param test
	 */
	'create': function (test) {
		var newRecord = _cms.create( 'posts', expected );

		test.equal( newRecord, expected, 'should create and return object in collection.' );
		test.done();
	},
	/**
	 * I verify that the cms can read a object by _id.
	 * @param test
	 */
	'read': function (test) {
		test.equal( _cms.read( 'posts', expected ), expected, 'should read item from collection by the _id.' );
		test.done();
	},
	/**
	 * I verify that the cms can update a object.
	 * @param test
	 */
	'update': function (test) {

		var updatedRecord = _cms.update( 'posts', expected );

		test.equal( updatedRecord, expected, 'should update object in the collection.' );
		test.done();
	},
	/**
	 * I verify that the cms can destroy a object by _id.
	 * @param test
	 */
	'destroy': function (test) {
		test.equal( _cms.destroy( 'posts', expected ), expected, 'should destroy object in the collection.' );
		test.done();
	}
};
