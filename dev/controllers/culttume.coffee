mongoose = require 'mongoose'
db = mongoose.connect 'localhost', 'culttume', 27017
# Create schema `userSchema`
userSchema = require '../models/user'
# Model for schema `User`
User = db.model 'User', userSchema
# import `sendmail` librarie
mail = require '../lib/sendmail'
# posible status for response
statusRegister = 
	emailCreatedSuccefully : 1
	emailDuplicate  : 11000
	updateCorrectly : 2

# render view `index`
exports.index = (req, res) ->
	res.render 'index', title: 'culttume'

# list of users
exports.lists = (req, res) ->
	User.find (err, users) ->
		res.send users

# Export for other uses
exports.user = User