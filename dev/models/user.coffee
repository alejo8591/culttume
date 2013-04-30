mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId
UserSchema = new Schema()

UserSchema.add(
	registerId: ObjectId
	email:
		type: String
		unique: true
		lowercase: true  
		required: true 
	name:
		type: String
		#required: true
	codeRegister:
		type: String
		lowercase: true
		#required: true
		unique: true
	services: 
		type: [String]
		lowercase: true
		#required: true
	genre:
		type: String
		lowercase: true
		#required: true
	know: 
		type: String
		lowercase: true
		#required: true
	age:
		type: Number
		min: 18
		max: 75
		#required: true
	date:
		type: Date 
		default: Date.now
)

module.exports = mongoose.model  'User', UserSchema