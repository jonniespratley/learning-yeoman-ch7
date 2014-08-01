'use strict';
exports.RestServer = function() {
	var express = require('express'), bodyParser = require('body-parser'), server = express();

	server.use(bodyParser.json());
	server.use(function (req, res, next) {
		console.log(req.body);
		next();
	});

	server.get('/api', function (req, res) {
		res.send({message: 'RESTful Node API Server'});
	});

	server.get('/api/:table', function (req, res) {
		res.send({message: 'Query items in ' + req.params.table});
	});

	server.post('/api/:table', function (req, res) {
		res.send({message: 'Create item in ' + req.params.table});
	});


	server.put('/api/:table/:id', function (req, res) {
		res.send({message: 'Update item ' + req.params.id + ' in ' + req.params.table});
	});

	return server;
};