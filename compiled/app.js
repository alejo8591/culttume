(function() {
  var app, culttume, express;

  express = require('express');

  app = express();

  app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    return app.use(app.router);
  });

  culttume = require('./controllers/culttume');

  app.get('/list', culttume.list);

  app.listen(3000);

  console.log("Listen 3000");

}).call(this);
