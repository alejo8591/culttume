(function() {
  var User, db, mongoose, userSchema;

  mongoose = require('mongoose');

  db = mongoose.createConnection('localhost', 'culttume', 27017);

  userSchema = require('../models/user');

  User = db.model('User', userSchema);

  exports.list = function(req, res) {
    return User.find(function(err, users) {
      return res.send(users);
    });
  };

}).call(this);
