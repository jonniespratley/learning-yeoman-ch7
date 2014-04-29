/*
 * jps cms
 *
 *
 * Copyright (c) 2014 Jonnie Spratley
 * Licensed under the MIT license.
 */
/* global console */
(function ($) {

	// Collection method.
	$.fn.cms = function () {
		return this.each( function (i) {
			// Do something awesome to each selected element.
			$( this ).html( 'cms' + i );
		} );
	};

	/**
	 * CMS - I hold methods for interacting with a remote object via HTTP.
	 * @param options The options passed to the plugin.
	 * @returns {string}
	 */
	$.cms = function (options) {
		// Override default options with passed-in options.
		options = $.extend( {}, $.cms.options, options );
		return this;
	};

	/**
	 * Send a get to backend for collection.
	 * @param col
	 */
	$.cms.create = function (col, obj) {
		console.log( 'create', col, obj );
	};

	/**
	 * I handle reading a remote object by id in collection.
	 * @param col The name of the collection
	 * @param id The id of the object
	 */
	$.cms.read = function (col, id) {
		console.log( 'read', col, id );
	};

	/**
	 * I handle updating a remote object in collection
	 * @param col
	 * @param obj
	 */
	$.cms.update = function (col, obj) {
		console.log( 'update', col, obj );
	};

	/**
	 * I handle destorying a remote object in collection.
	 * @param col
	 * @param obj
	 */
	$.cms.destroy = function (col, obj) {
		console.log( 'destroy', col, obj );
	};

	/**
	 * I handle querying a remote object in collection.
	 * @param col
	 * @param query
	 */
	$.cms.query = function (col, query) {
		console.log( 'query', col, query );
	};

	/**
	 * Static default objects.
	 *
	 * @type {{endpoint: string}}
	 */
	$.cms.options = {
		endpoint: 'http://localhost:9191'
	};

}( jQuery ));