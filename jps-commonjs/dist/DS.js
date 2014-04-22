var events, utils;

events = require('events');

utils = require('util');


/*
  DS
  This is a class that has database access methods and routes method calls to the adapter specficied.
 */

exports.DS = (function() {
  function DS(options) {
    this.options = options;
    utils.inherits(this, events.EventEmitter);
    events.EventEmitter.call(this);
    return this;
  }

  DS.prototype.call = function() {
    var _ref, _ref1, _ref2, _ref3;
    utils.log((_ref = this.options.adapter) != null ? _ref.hasOwnProperty([arguments[0]]) : void 0, arguments[0], arguments);
    this.emit(arguments[0], arguments);
    if ((_ref1 = this.options.adapter) != null ? _ref1.hasOwnProperty([arguments[0]]) : void 0) {
      if ((_ref2 = this.options.adapter) != null) {
        _ref2[arguments[0]].call((_ref3 = this.options.adapter) != null ? _ref3[arguments[1]] : void 0);
      }
    } else {
      throw new Error("You need to provide an extension!");
    }
  };

  DS.prototype.findOne = function(col, id) {
    return "findOne " + col + " " + id;
  };

  DS.prototype.findAll = function(col) {
    return "findAll " + col;
  };

  DS.prototype.createRecord = function(col, obj) {
    return obj;
  };

  DS.prototype.save = function(col, obj) {
    return obj;
  };

  return DS;

})();
