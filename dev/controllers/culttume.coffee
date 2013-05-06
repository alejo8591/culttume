mongoose = require 'mongoose'
db = mongoose.connect 'localhost', 'culttume', 27017
# Create schema `userSchema`
userSchema = require '../models/user'
# Model for schema `User`
User = db.model 'User', userSchema
# import `sendmail` librarie
mail = require '../lib/sendmail'
# posible status for response
status = 
	emailCreatedSuccefully : 1
	emailDuplicate  : 11000
	updateCorrectly : 2

# render view `index`
exports.index = (req, res) ->
	res.render 'index', title: 'culttume'

# register user and emit email
# register user and emit email
exports.register = (user) ->
	# object User
	registerCode = Math.random().toString(36).substr 2, 8
	users = new User({email: user.toLowerCase(), registerCode: registerCode})
	users.save (err)->
		unless err
			console.log 'created'
			mail.sendmail(user.toLowerCase(), registerCode)
		else
			console.log err
	return user.toLowerCase()

# list of users
exports.lists = (req, res) ->
	User.find (err, users) ->
		res.send users

# Export for other uses
exports.user = User