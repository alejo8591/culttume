mongoose = require 'mongoose'
db = mongoose.createConnection 'localhost', 'culttume', 27017
userSchema = require '../models/user'
User = db.model 'User', userSchema

exports.list = (req, res) ->
	User.find (err, users) ->
		res.send users