(function() {
  var app, express, http, mongoose, path, routes;

  express = require('express');

  http = require('http');

  path = require('path');

  routes = require('./routes/culttume');

  mongoose = require('mongoose');

  app = express();

  app.configure(function() {
    app.set('port', process.env.PORT || 7575);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express["static"](path.join(__dirname, 'public')));
  });

  app.configure('development', function() {
    return app.use(express.errorHandler());
  });

  app.get('/', routes.index);

  http.createServer(app).listen(app.get('port'), function() {
    return console.log("Listening " + app.get('port'));
  });

}).call(this);
