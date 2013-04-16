# Create Connection
mongoose = require 'mongoose'
db       = mongoose.createConnection 'mongodb://127.0.0.1:27017/culttume'
# models user charge
#userSchema = require '../models/userSchema'
#User = db.model 'User', userSchema 
# export index route for view index
exports.index = (req, res) ->
	res.render 'index', title:'Bienvenido a culttu.me'
	console.log 'loaded index view'