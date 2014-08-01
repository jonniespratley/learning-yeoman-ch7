(function($) {
	var crud = {
		endpoint: '/api',
		create: function(table, data) {
			return this._send('POST', table, data);
		},
		read: function(table, data) {
			return this._send('GET', table, data);
		},
		update: function(table, data) {
			return this._send('PUT', table, data);
		},
		destroy: function(table, data) {
			return this._send('DELETE', table, data);
		},
		query: function(table, params) {
			return this._send('GET', table, params);
		},
		_send: function(type, table, data) {
			var url;
			url = this.endpoint + "/" + table;
			if (data != null ? data.id : void 0 && type !== 'GET') {
				url += '/' + (data != null ? data.id : void 0);
			}
			return $.ajax({
				url: url,
				type: type,
				dataType: "json",
				data: data
			});
		}
	};
	$.extend($.fn, {
		crud: crud
	});
})(jQuery);