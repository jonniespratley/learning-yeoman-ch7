# global require export

#Require modules

#core module
core = (options) ->
	@id = "Core module"
	@uri = "Resource"

	#Invoke the EventEmitter
	events.EventEmitter.call this
	@options = options
	@name = "core module"
	@extension = (if @options.extension then @options.extension else {})

	#Initialize the module
	@init = ->
		@emit "init", this
		utils.log "core.init()", @options
		return


	#Call method which will call method on extension if there
	@call = ->

		#Log
		utils.log @extension.hasOwnProperty([arguments[0]]), arguments[0], arguments

		#emit
		@emit arguments[0], arguments

		#check
		if @extension.hasOwnProperty([arguments[0]])

			#invoke
			@extension[arguments[0]].call @extension[arguments[1]]
		else

			#error
			throw new Error("You need to provide an extension!")
		return

	@save = (args) ->
		@call "save", args
		return

	@read = (args) ->
		utils.log "read", args
		@emit "read", args
		return

	@update = (args) ->
		utils.log "update", args
		@emit "update", args
		return

	@destroy = (args) ->
		utils.log "destroy", args
		@emit "destroy", args
		return

	return
utils = require("util")
events = require("events")

#Make core inherit all of EventEmitter properties/methods
utils.inherits core, events.EventEmitter

#Make public
exports.core = core