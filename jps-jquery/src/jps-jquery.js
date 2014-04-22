/*
 * jps jquery
 * 
 *
 * Copyright (c) 2014 jonnie spratley
 * Licensed under the MIT license.
 */

(function ($) {

	// Collection method.
	$.fn.awesome = function () {
		return this.each(function (i) {
			// Do something awesome to each selected element.
			$(this).html('awesome' + i);
		});
	};

	// Static method.
	$.awesome = function (options) {
		// Override default options with passed-in options.
		options = $.extend({}, $.awesome.options, options);
		// Return something awesome.
		return 'awesome' + options.punctuation;
	};

	// Static method default options.
	$.awesome.options = {
		punctuation: '.'
	};

	// Custom selector.
	$.expr[':'].awesome = function (elem) {
		// Is this element awesome?
		return $(elem).text().indexOf('awesome') !== -1;
	};


	/**
	 * Lets create a simple data source plugin that connects to
	 * either a restfull backend or a web socket backended to
	 * transmit objects to channels on backend. And the backend logic
	 * will handle and send back to client.
	 */

	$.fn.ds = function () {
		return this.each(function (i) {
			// Do something awesome to each selected element.
			$(this).html('ds' + i);
		});
	};

	$.ds = {
		el: '#datasource',
		host: 'localhost',
		onConnect: function (data) {
			console.log('onConnect', data);
		},
		render: function (data) {
			$(elem).html(data);
		}

	};


	// Static method.
	$.ds = function (options) {
		// Override default options with passed-in options.
		options = $.extend({}, $.awesome.options, options);
		// Return something awesome.
		return $(options.el);
	};


}(jQuery));
