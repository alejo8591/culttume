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

  exports.register = function(req, res) {
    var users;

    users = new User({
      email: req.body.email.toLowerCase()
    });
    users.save(function(err) {
      if (!err) {
        return console.log("created");
      } else {
        return console.log(err);
      }
    });
    return res.render('index', {
      title: 'Gracias ya casi terminamos'
    });
  };

  exports.list = function(req, res) {
    return User.find(function(err, users) {
      console.log(users);
      return res.send(users);
    });
  };

}).call(this);
