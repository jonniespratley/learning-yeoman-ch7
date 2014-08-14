( function($) {

	var expected = {
		create : 'Create item in posts',
		query : 'Query items in posts',
		update : 'Update item 1 in posts',
		destroy : 'Delete item 1 in posts',
		read : 'Read item 1 in posts'
	};

	//Group related tests under a single label.
	module('$.fn.crud', {
		setup : function() {
			$.mockjax({
				url : '/api/*',
				type : 'GET',
				responseText : {
					message : expected.query
				}
			});
			$.mockjax({
				url : '/api/*',
				type : 'POST',
				responseText : {
					message : expected.create
				}
			});
			$.mockjax({
				url : '/api/*/1',
				type : 'PUT',
				responseText : {
					message : expected.update
				}
			});
			$.mockjax({
				url : '/api/*/1',
				type : 'DELETE',
				responseText : {
					message : expected.destroy
				}
			});
		}
	});

	//Should make a POST request to the server sending the data.
	asyncTest('create', function(assert) {
		expect(1);
		$.fn.crud.create('posts', {
			name : 'test',
			body : 'This is a test.'
		}).done(function(data) {
			assert.equal(data.message, expected.create, 'should return data');
			start();
		});
	});
	//Should make a GET request to the server.
	asyncTest('query', function(assert) {
		expect(1);
		$.fn.crud.query('posts').done(function(data) {
			assert.equal(data.message, expected.query, 'should return data');
			start();
		});
	});
	//Should make PUT request to server.
	asyncTest('update', function(assert) {
		expect(1);
		$.fn.crud.update('posts', {
			id : 1,
			title : 'Updated title'
		}).done(function(data) {
			assert.equal(data.message, expected.update, 'should return data');
			start();
		});
	});
	//Should make DELETE request to server.
	asyncTest('destroy', function(assert) {
		expect(1);
		$.fn.crud.destroy('posts', {
			id : 1
		}).done(function(data) {
			assert.equal(data.message, expected.destroy, 'should return data');
			start();
		});
	});
}(jQuery));
