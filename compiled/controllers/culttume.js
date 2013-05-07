(function() {
  var User, db, mail, mongoose, status, userSchema;

  mongoose = require('mongoose');

  db = mongoose.connect('localhost', 'culttume', 27017);

  userSchema = require('../models/user');

  User = db.model('User', userSchema);

  mail = require('../lib/sendmail');

  status = {
    emailCreatedSuccefully: 1,
    emailDuplicate: 11000,
    updateCorrectly: 2
  };

  exports.index = function(req, res) {
    return res.render('index', {
      title: 'culttume'
    });
  };

  exports.register = function(user) {
    var registerCode, users;

    this.data = {};
    registerCode = Math.random().toString(36).substr(2, 8);
    users = new User({
      email: user.toLowerCase(),
      registerCode: registerCode
    });
    return users.save(function(err) {
      if (!err) {
        console.log('created');
        mail.sendmail(user.toLowerCase(), registerCode);
        this.data = {
          email: user,
          status: status.emailCreatedSuccefully
        };
        console.log(this.data);
      } else {
        this.data = {
          email: user,
          status: status.emailDuplicate
        };
        console.log(this.data);
      }
      console.log(this.data);
      return this.data;
    });
  };

  exports.lists = function(req, res) {
    return User.find(function(err, users) {
      return res.send(users);
    });
  };

  exports.user = User;

}).call(this);
