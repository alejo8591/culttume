mongoose = require 'mongoose'
db = mongoose.connect 'localhost', 'culttume', 27017

userSchema = require '../models/user'
User = db.model 'User', userSchema

exports.index = (req, res) ->
	res.render 'index', title: 'culttume'

exports.register = (req, res) ->
	users = new User({email: req.body.email.toLowerCase()})

	users.save (err)->
		unless err
			console.log "created"
		else
			console.log err

	res.render 'index', title: 'Gracias ya casi terminamos'

exports.list = (req, res) ->
	User.find (err, users) ->
		console.log users
		res.send users