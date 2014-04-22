var DS, DSMongoAdapter, events, utils,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DS = require('./DS');

events = require('events');

utils = require('util');

DSMongoAdapter = (function(_super) {
  __extends(DSMongoAdapter, _super);

  DSMongoAdapter.name = 'MongoDB Adapter';

  DSMongoAdapter.options = {
    host: 'localhost',
    port: 27017
  };

  function DSMongoAdapter(options) {
    this.options = options;
    events.EventEmitter.call(this);
    console.log('mongo-adapter');
  }

  return DSMongoAdapter;

})(DS);

utils.inherits(DSMongoAdapter, events.EventEmitter);

exports.DSMongoAdapter = DSMongoAdapter;
