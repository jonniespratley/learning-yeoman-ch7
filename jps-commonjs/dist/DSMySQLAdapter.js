var DS, DSMySQLAdapter, events, utils,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DS = require('./DS');

events = require('events');

utils = require('util');

DSMySQLAdapter = (function(_super) {
  __extends(DSMySQLAdapter, _super);

  DSMySQLAdapter.name = 'MySQLAdapter Adapter';

  DSMySQLAdapter.options = {
    host: 'localhost',
    port: 27017
  };

  function DSMySQLAdapter(options) {
    this.options = options;
    events.EventEmitter.call(this);
    console.log('mysql-adapter');
  }

  return DSMySQLAdapter;

})(DS);

utils.inherits(DSMySQLAdapter, events.EventEmitter);

exports.DSMySQLAdapter = DSMySQLAdapter;
