###
  Server-side CMS CRUD Plugin

  Usage:
  cms = new cms(endpoint: 'http://localhost:8181/api', adapter: 'http')
  cms.create('posts', title: 'new post')
  cms.update('posts', _id: 1, title: 'updated post')
  cms.destroy('posts', _id: 1)
  cms.read('posts', _id: 1)
###
class exports.cms
	constructor: (@options) ->
		return @
	create: (model, data) ->
		@_send 'POST', model, data

	read: (model, id) ->
		@_send 'GET', model, id

	update: (model, data) ->
		@_send 'PUT', model, data

	destroy: (model, data) ->
		@_send 'DELETE', model, data

	query: (model, data, params) ->
		@_send 'GET', model, null, params

	_send :(type = 'GET', model, data = null, params = null) ->
		url = @options.endpoint + "/" + model
		url += '/' + data?._id if data?._id
		console.log(
			url: url
			type: type
			params: params
			dataType: "json"
			data: data
		)
		if data
			return data
		else
			return params
