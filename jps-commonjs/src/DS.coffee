events = require('events')
utils = require('util')
###
  DS
  This is a class that has database access methods and routes method calls to the adapter specficied.
###
class exports.DS
	constructor: (@options) ->
		#Make core inherit all of EventEmitter properties/methods
		utils.inherits(@, events.EventEmitter)
		#//Invoke the EventEmitter
		events.EventEmitter.call(@)
		return @

	#Call method which will call method on extension if there
	call: ->
		#Log
		utils.log @options.adapter?.hasOwnProperty([arguments[0]]), arguments[0], arguments

		#emit
		@emit arguments[0], arguments

		#check
		if @options.adapter?.hasOwnProperty([arguments[0]])

			#invoke
			@options.adapter?[arguments[0]].call @options.adapter?[arguments[1]]
		else

			#error
			throw new Error("You need to provide an extension!")
		return

	findOne: (col, id) ->
		"findOne #{col} #{id}"
	findAll: (col) ->
		"findAll #{col}"
	createRecord: (col, obj) ->
		#Create record logic
		return obj
	save: (col, obj) ->
		#save record logic
		return obj


