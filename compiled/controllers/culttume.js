(function() {
  var User, db, mongoose, userSchema;

  mongoose = require('mongoose');

  db = mongoose.connect('localhost', 'culttume', 27017);

  userSchema = require('../models/user');

  User = db.model('User', userSchema);

  exports.index = function(req, res) {
    return res.render('index', {
      title: 'culttume'
    });
  };

  exports.register = function(user) {
    var users;

    users = new User({
      email: user.toLowerCase()
    });
    return users.save(function(err) {
      if (!err) {
        return console.log("created");
      } else {
        return console.log(err);
      }
    });
  };

  exports.list = function(req, res) {
    return User.find(function(err, users) {
      console.log(users);
      return res.send(users);
    });
  };

}).call(this);
