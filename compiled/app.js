(function() {
  var User, app, culttume, express, http, io, mail, path, server, statusRegister;

  express = require('express');

  app = express();

  http = require('http');

  server = http.createServer(app);

  io = require('socket.io').listen(server);

  path = require('path');

  culttume = require('./controllers/culttume');

  User = culttume.user;

  mail = require('./lib/sendmail');

  statusRegister = {
    emailCreatedSuccefully: 1,
    emailDuplicate: 11000,
    updateCorrectly: 2,
    verificationCodeOk: 3,
    verificationCodeFail: 4
  };

  app.configure(function() {
    app.set('port', process.env.PORT || 80);
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
    socket.on('registerEmail', function(email) {
      var registerCode, users;
      registerCode = Math.random().toString(36).substr(2, 8);
      users = new User({
        email: email.toLowerCase(),
        registerCode: registerCode,
        useRegistrationCode: 0
      });
      return users.save(function(err) {
        if (!err) {
	  mail.sendmail(users.email, registerCode);
          return socket.emit('fillData', {
            email: users.email,
            status: statusRegister.emailCreatedSuccefully,
            registerCode: users.registerCode
          });
        } else {
          return socket.emit('fillData', {
            email: users.email,
            status: statusRegister.emailDuplicate
          });
        }
      });
    });
    socket.on('verificationCode', function(data) {
      console.log(data.code);
      return User.findOne({
        'email': data.email,
        'registerCode': data.code,
        'useRegistrationCode': 0
      }, 'email', function(err, user) {
        if (user === null) {
          return socket.emit('receiveDataProfile', {
            status: statusRegister.verificationCodeFail
          });
        } else {
          return socket.emit('receiveDataProfile', {
            status: statusRegister.verificationCodeOk
          });
        }
      });
    });
    socket.on('receiveAllDataProfile', function(data) {
      return User.update({
        email: data.email
      }, {
        name: data.name,
        profile: data.profile,
        country: data.country,
        city: data.city,
        useRegistrationCode: 1,
        genre: data.genre,
        know: data.askAbout,
        age: parseInt(data.age),
        services: data.services,
        points: 100
      }, {
        upsert: true
      }, function(err, user) {
        if (!err) {
          return socket.emit('congratulationDetail', {
            name: data.name,
            email: data.email
          });
        } else {
          return console.log('error update');
        }
      });
    });
    return socket.on('validationCodeRequest', function(data) {
      return User.findOne({
        'email': data.email,
        'registerCode': data.code,
        'useRegistrationCode': 0
      }, 'email', function(err, user) {
        if (user === null) {
          return socket.set('validationCodeResponse', {
            status: statusRegister.verificationCodeFail
          });
        } else {
          return socket.set('validationCodeResponse', {
            status: statusRegister.verificationCodeOk
          });
        }
      });
    });
  });

  server.listen(app.get('port'), function() {
    return console.log('Express server listen on port', app.get('port'));
  });

}).call(this);
