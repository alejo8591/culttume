(function() {
  var User, db, mail, mongoose, userSchema;

  mongoose = require('mongoose');

  db = mongoose.connect('localhost', 'culttume', 27017);

  userSchema = require('../models/user');

  User = db.model('User', userSchema);

  mail = require('../lib/sendmail');

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
        console.log('created');
        return mail.sendmail(user.toLowerCase());
      } else {
        return console.log(err);
      }
    });
  };

  exports.lists = function(req, res) {
    return User.find(function(err, users) {
      return res.send(users);
    });
  };

  exports.user = User;

}).call(this);
