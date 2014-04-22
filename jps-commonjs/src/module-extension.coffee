# globals exports require
((api) ->
	"use strict"

	#Require modules
	utils = require("util")
	events = require("events")

	#extension module
	api.extension =
		name: "module extension"
		init: ->
			console.log "extension.init()"
			return

		save: (args) ->
			console.log "extension.save"
			return

	return
) typeof exports is "object" and exports or this