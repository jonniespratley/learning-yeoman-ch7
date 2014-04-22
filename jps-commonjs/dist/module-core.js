var core, events, utils;

core = function(options) {
  this.id = "Core module";
  this.uri = "Resource";
  events.EventEmitter.call(this);
  this.options = options;
  this.name = "core module";
  this.extension = (this.options.extension ? this.options.extension : {});
  this.init = function() {
    this.emit("init", this);
    utils.log("core.init()", this.options);
  };
  this.call = function() {
    utils.log(this.extension.hasOwnProperty([arguments[0]]), arguments[0], arguments);
    this.emit(arguments[0], arguments);
    if (this.extension.hasOwnProperty([arguments[0]])) {
      this.extension[arguments[0]].call(this.extension[arguments[1]]);
    } else {
      throw new Error("You need to provide an extension!");
    }
  };
  this.save = function(args) {
    this.call("save", args);
  };
  this.read = function(args) {
    utils.log("read", args);
    this.emit("read", args);
  };
  this.update = function(args) {
    utils.log("update", args);
    this.emit("update", args);
  };
  this.destroy = function(args) {
    utils.log("destroy", args);
    this.emit("destroy", args);
  };
};

utils = require("util");

events = require("events");

utils.inherits(core, events.EventEmitter);

exports.core = core;
