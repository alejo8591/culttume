(function() {
  var ObjectId, Schema, UserSchema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  ObjectId = Schema.ObjectId;

  UserSchema = new Schema();

  UserSchema.add({
    registerId: ObjectId,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    name: {
      type: String
    },
    codeRegister: {
      type: String,
      lowercase: true,
      unique: true
    },
    services: {
      type: [String],
      lowercase: true
    },
    genre: {
      type: String,
      lowercase: true
    },
    know: {
      type: String,
      lowercase: true
    },
    age: {
      type: Number,
      min: 18,
      max: 75
    },
    date: {
      type: Date,
      "default": Date.now
    }
  });

  module.exports = mongoose.model('User', UserSchema);

}).call(this);
