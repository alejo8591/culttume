mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

userSchema = new Schema
	id  		: ObjectId 
	name      	: String
	typeUser	: [String]
	city      	: String
	age 		: type: Number, min:18, max:65
	gender    	: String
	receive   	: String
	options   	: [String]

module.exports = userSchema