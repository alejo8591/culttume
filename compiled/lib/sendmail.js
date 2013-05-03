(function() {
  var nodemailer;

  nodemailer = require('nodemailer');

  /*
  */


  exports.sendmail = function(emailPersonal, registerCode) {
    var message, transport, transports;

    transport = nodemailer.createTransport("SMTP", {
      service: 'Gmail',
      auth: {
        user: "culttu.me@gmail.com",
        pass: "INGRESO12345!"
      }
    });
    console.log('SMTP configured');
    message = {
      from: '"culttu.me" <culttu.me@gmail.com>',
      to: emailPersonal,
      subject: '¡Bienvenido a culttume!',
      text: 'Plaintext',
      alternatives: [
        {
          contentType: "text/x-web-markdown",
          contents: "**markdown** alternative"
        }, {
          contentType: "text/html; charset=utf-8",
          contentEncoding: "7bit",
          contents: "<h2>Genial!. Ya estás inscrit@.</h2>" + registerCode + "<p>Pronto podrás tener acceso a nuestras opciones... mientras tanto, te invitamos a seguirnos en nuestras redes sociales y a enviarnos tus sugerencias. Escríbenos a culttu.me@gmail.com, te aseguramos que respondemos absolutamente todos los mensajes.</p><ul><li>Fan page: fb.com/culttu.me</li><li>Twitter: @culttume</li><li>Blog: culttume.blogspot.com</li></ul><p><strong>El equipo de culttu.me</strong></p>"
        }
      ]
    };
    console.log('sending Mail');
    return transports = transport.sendMail(message, function(error) {
      if (error) {
        console.log("Error ocurred");
        console.log(error.message);
        return;
      }
      return console.log('message Sent');
    });
  };

}).call(this);
