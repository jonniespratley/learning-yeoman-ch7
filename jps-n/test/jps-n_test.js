var RestServer = require('../lib/jps-n.js').RestServer;

var request = require('supertest'),
  mockServer,
  expected = {
    message: 'RESTful Node API Server'
  };

//Start mock server
mockServer = new RestServer();
mockServer.listen(9090);

//Listen to mock server


exports.RestServer = {
  setUp: function(done) {
    done();
  },
  'GET /api/posts': function(test) {
    expected.message = 'Query items in posts';

    request(mockServer).get('/api/posts').expect('Content-Type', /json/).expect(200).end(function(err, res) {
      if (err) {
        throw err;
      }
      test.deepEqual(res.body, expected, 'should get all items');
      test.done();
    });

  },
  'POST /api/posts': function(test) {
    expected.message = 'Create item in posts';
    request(mockServer).post('/api/posts').expect('Content-Type', /json/).expect(200).end(function(err, res) {
      if (err) {
        throw err;
      }
      test.deepEqual(res.body, expected, 'should create item');
      test.done();
    });
  }
};