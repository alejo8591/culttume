(function() {
  var User, app, culttume, express, http, io, mail, path, server;

  express = require('express');

  app = express();

  http = require('http');

  server = http.createServer(app);

  io = require('socket.io').listen(server);

  path = require('path');

  culttume = require('./controllers/culttume');

  User = culttume.user;

  mail = require('./lib/sendmail');

  app.configure(function() {
    app.set('port', process.env.PORT || 3030);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express["static"](__dirname + '/public'));
    return app.use(app.router);
  });

  app.configure('development', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', culttume.index);

  app.get('/lists', culttume.lists);

  io.sockets.on('connection', function(socket) {
    socket.emit('conected', {
      respond: 'conected'
    });
    return socket.on('registerEmail', function(email) {
      var registerCode, users;

      registerCode = Math.random().toString(36).substr(2, 8);
      users = new User({
        email: email.toLowerCase(),
        registerCode: registerCode
      });
      return users.save(function(err) {
        if (!err) {
          console.log('created');
          return socket.emit('fillData', {
            email: users.email,
            status: 1
          });
        } else {
          socket.emit('fillData', {
            email: users.email,
            status: 11000
          });
          return console.log(err);
        }
      });
    });
  });

  server.listen(app.get('port'), function() {
    return console.log('Express server listen on port', app.get('port'));
  });

}).call(this);
