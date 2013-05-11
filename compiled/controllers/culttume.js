(function() {
  var User, db, mail, mongoose, statusRegister, userSchema;

  mongoose = require('mongoose');

  db = mongoose.connect('localhost', 'culttume', 27017);

  userSchema = require('../models/user');

  User = db.model('User', userSchema);

  mail = require('../lib/sendmail');

  statusRegister = {
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
    var data, registerCode, users;

    data = {};
    registerCode = Math.random().toString(36).substr(2, 8);
    users = new User({
      email: user.toLowerCase(),
      registerCode: registerCode
    });
    users.save(function(err) {
      if (!err) {
        console.log(statusRegister);
        console.log('created');
        mail.sendmail(user.toLowerCase(), registerCode);
        return data.statusReg = statusRegister.emailCreatedSuccefully;
      } else {
        console.log(statusRegister);
        console.log(err);
        return data.statusReg = statusRegister.emailDuplicate;
      }
    });
    data.email = user;
    console.log(data);
    return data;
  };

  exports.lists = function(req, res) {
    return User.find(function(err, users) {
      return res.send(users);
    });
  };

  exports.user = User;

}).call(this);
