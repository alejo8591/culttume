mongoose = require 'mongoose'
db = mongoose.connect 'localhost', 'culttume', 27017

userSchema = require '../models/user'
User = db.model 'User', userSchema

mail = require '../lib/sendmail'

exports.index = (req, res) ->
	res.render 'index', title: 'culttume'

exports.register = (user) ->
	# object User
	users = new User({email: user.toLowerCase()})
	users.save (err)->
		unless err
			console.log 'created'
			mail.sendmail()
		else
			console.log err

exports.lists = (req, res) ->
	User.find (err, users) ->
		res.send users

exports.user = User