mongoose = require 'mongoose'
db = mongoose.connect 'localhost', 'culttume', 27017

userSchema = require '../models/user'
User = db.model 'User', userSchema

exports.index = (req, res) ->
	res.render 'index', title: 'culttume'

exports.register = (user) ->
	# object User
	users = new User({email: user.toLowerCase()})
	users.save (err)->
		unless err
			console.log 'created'
		else
			console.log err

exports.lists = (req, res) ->
	User.find (err, users) ->
		res.send users

	# res.render 'index', title: 'Gracias ya casi terminamos'

exports.user = User