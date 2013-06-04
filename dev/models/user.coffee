mongoose = require 'mongoose'
Schema = mongoose.Schema
ObjectId = Schema.ObjectId
UserSchema = new Schema()

UserSchema.add(
	registerId: ObjectId
	email:
		type: String
		lowercase: true  
		required: true
		unique: true 
	name:
		type: String
		#required: true
	registerCode:
		type: String
		lowercase: true
		#required: true
		unique: true
	useRegistrationCode:
		type: Number
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
	profile:
		type: String
		lowercase: true
	city:
		type: String
		lowercase: true
	points:
		type: Number
	date:
		type: Date 
		default: Date.now
)

module.exports = mongoose.model  'User', UserSchema