'use strict';
var DS = require('../src/ds.js').DS;
var _ds = new DS({
  host: 'test:test@ds037498.mongolab.com:37498/learning-yeoman',
  models: {
    'pages': {
      title: String,
      body: String
    }
  }
});
var _page, _pages, _id;
exports['DS'] = {
  setUp: function(done) {
    done();
  },
  'noTable': function(test) {
    test.expect(1);
    test.throws(function() {
      _ds.findAll('null-table');
    }, Error, 'should throw Error if no table');
    test.done();
  },

  'findAll': function(test) {
    test.expect(1);
    _ds.findAll('pages').then(function(data) {
      _pages = data;
      test.ok((data instanceof Array));
      test.done();
    });
  },
  'findOne': function(test) {
    test.expect(1);
    _id = _pages[0]._id;
    _ds.findOne('pages', _id).then(function(data) {
      _page = data;
      test.ok((data instanceof Object), 'should return object.');
      test.done();
    });
  },
  'create': function(test) {
    test.expect(1);
    _page = {
      title: 'Page ' + Date.now(),
      body: 'This is the page content.',
      published: true,
      created: new Date()
    };
    _ds.create('pages', _page).then(function(data) {
      test.ok(data._id, 'should return object with id.');
      test.done();
    });
  },

  'update': function(test) {
    test.expect(1);
    _page = {
      title: 'Updated Page'
    };
    _ds.update('pages', _id, _page).then(function(data) {
      test.equal(data.title, 'Updated Page', 'should have updated title.');
      test.done();
    });
  },
  'destroy': function(test) {
    test.expect(1);
    _ds.destroy('pages', _page._id).then(function(data) {
      test.equal(data, true, 'should return object.');
      test.done();
    });
  }
};
