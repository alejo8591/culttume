(function() {
  var app, culttume, express, http, io, path, server;

  express = require('express');

  app = express();

  http = require('http');

  server = http.createServer(app);

  io = require('socket.io').listen(server);

  path = require('path');

  culttume = require('./controllers/culttume');

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
    socket.on('click', function(email) {
      culttume.register(email);
      return socket.emit('pulseCount');
    });
    return socket.on('otherClick', function() {
      return culttume.user.find(function(err, users) {
        if (err) {
          handleError(err);
        }
        return socket.emit('returnList', {
          user: users
        });
      });
    });
  });

  server.listen(app.get('port'), function() {
    return console.log('Express server listen on port', app.get('port'));
  });

}).call(this);
