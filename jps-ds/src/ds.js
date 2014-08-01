/*
 * DS
 * https://github.com/jonniespratley/ds
 *
 * Copyright (c) 2014 Jonnie
 * Licensed under the MIT license.
 */
/* global define, Deferred, require  */

(function(exports) {
  'use strict';
  exports.DS = function(options) {
    var mongoose = require("mongoose"),
      Q = require("q"),
      instance = null,
      models = {},
      ds = {};
    ds.connect = function(host) {
      if (options.models) {
        for (var m in options.models) {
          if (m) {
            var model = mongoose.model(m, new mongoose.Schema(options.models[m]));
            models[m] = model;
          }
        }
       
      }
      instance = mongoose.connect("mongodb://" + host);
      return this;
    };


    ds.findAll = function(name) {
      var deferred = Q.defer();
      if (!models[name]) {
        throw new Error('Must add table to options.');
      }
      models[name].find(function(err, m) {
        if (!err) {
          deferred.resolve(m);
        }
        else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };
    ds.findOne = function(name, id) {
      var deferred = Q.defer();
      if (!models[name]) {
        throw new Error('Must add table to options.');
      }
      models[name].findById(id, function(err, m) {
        if (!err) {
          deferred.resolve(m);
        }
        else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };


    ds.create = function(name, data) {
      var deferred = Q.defer();
     if (!models[name]) {
        throw new Error('Must add table to options.');
      }
      var model = new models[name](data);
      model.save(function(err, m) {
        if (!err) {
          deferred.resolve(m);
        }
        else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };
    ds.update = function(name, id, data) {
      if (!models[name]) {
        throw new Error('Must add table to options.');
      }
      var deferred = Q.defer();
      models[name].findByIdAndUpdate(id, data, function(err, m) {
        if (!err) {
          deferred.resolve(m);
        }
        else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };
    ds.destroy = function(name, id) {
      var deferred = Q.defer();
      if (!models[name]) {
        throw new Error('Must add table to options.');
      }
      models[name].findByIdAndRemove(id, function(err, m) {
        if (!err) {
          deferred.resolve(true);
        }
        else {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    };
   
   if (options.host) {
			return ds.connect( options.host );
		} else {
			return ds;
		}
  };
}(typeof exports === 'object' && exports || this));
