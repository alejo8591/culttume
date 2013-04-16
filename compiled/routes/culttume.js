(function() {
  var db, mongoose;

  mongoose = require('mongoose');

  db = mongoose.createConnection('mongodb://127.0.0.1:27017/culttume');

  exports.index = function(req, res) {
    res.render('index', {
      title: 'Bienvenido a culttu.me'
    });
    return console.log('loaded index view');
  };

}).call(this);
