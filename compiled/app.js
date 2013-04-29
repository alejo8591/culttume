(function() {
  var app, culttume, express, http, io, path;

  express = require('express');

  path = require('path');

  http = require('http');

  culttume = require('./controllers/culttume');

  app = express();

  app.configure(function() {
    app.set('port', process.env.PORT || 7575);
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

  io = require('socket.io').listen(7576);

  io.sockets.on('connection', function(socket) {
    socket.emit('news', {
      hello: 'world'
    });
    return socket.on('my ohter event', function(data) {
      return console.log(data);
    });
  });

  app.get('/', culttume.index);

  app.post('/register', culttume.register);

  app.get('/list', culttume.list);

  http.createServer(app).listen(app.get('port'), function() {
    return console.log('Express server listen on port', app.get('port'));
  });

}).call(this);
