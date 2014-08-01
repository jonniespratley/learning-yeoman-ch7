(function($) {
  var expected = {
    create: 'Create item in posts',
    query: 'Query items in posts'
  };


  module('$.fn.crud', {
    setup: function() {
      $.mockjax({
        url: '/api/*',
        type: 'GET',
        responseText: {
          message: expected.query
        }
      });
      $.mockjax({
        url: '/api/*',
        type: 'POST',
        responseText: {
          message: expected.create
        }
      });
    }
  });

  //Should make a POST request to the server sending the data.
  asyncTest('create', function() {
    expect(1);
    $.fn.crud.create('posts', {
      name: 'test',
      body: 'This is a test.'
    }).done(function(data) {
      equal(data.message, expected.create, 'should return data');
      start();
    });
  });
  //Should make a GET request to the server.
  asyncTest('query', function() {
    expect(1);
    $.fn.crud.query('posts').done(function(data) {
      equal(data.message, expected.query, 'should return data');
      start();
    });
  });
}(jQuery));