(function(api) {
  "use strict";
  var events, utils;
  utils = require("util");
  events = require("events");
  api.extension = {
    name: "module extension",
    init: function() {
      console.log("extension.init()");
    },
    save: function(args) {
      console.log("extension.save");
    }
  };
})(typeof exports === "object" && exports || this);
