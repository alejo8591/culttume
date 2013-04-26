(function() {
  var ObjectId, Schema, UserSchema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  UserSchema = new Schema();

  console.log(UserSchema);

  UserSchema.add({
    registerId: ObjectId,
    options: {
      type: String,
      lowercase: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    genre: {
      type: String,
      lowercase: true,
      required: true
    },
    know: {
      type: String,
      lowercase: true,
      required: true
    },
    age: {
      type: Number,
      min: 18,
      max: 75,
      required: true
    },
    date: {
      type: Date,
      "default": Date.now
    },
    name: {
      type: String,
      "default": 'Anon',
      required: true
    }
  });

  module.exports = mongoose.model('User', UserSchema);

}).call(this);
