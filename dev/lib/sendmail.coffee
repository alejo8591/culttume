nodemailer = require 'nodemailer'

exports.sendmail= ->
	transport = nodemailer.createTransport "SMTP", 
				service : 'Gmail'
				auth    :
					user: "culttu.me@gmail.com"
					pass: "INGRESO12345!"

	console.log 'SMTP configured'


	message = 
		from : '"culttu.me" <culttu.me@gmail.com>'

		to: '"manuel pachon" <manuel.pachon@gmail.com>'

		subject: '¡Bienvenido a culttume!'

		text: 'Plaintext'

		alternatives: [
		    contentType		: "text/x-web-markdown"
		    contents		: "**markdown** alternative"
		  	,
		    contentType		: "text/html; charset=utf-8"
		    contentEncoding: "7bit"
		    contents		: "<h1>Gracias por pertencer a culttume!</h1><h2>Confirma si te llego el correo ;)</h2>"
	  	]

	console.log 'sending Mail'

	transports =  transport.sendMail message, (error) ->
	  	if error
	  		console.log "Error ocurred"
	  		console.log error.message
	  		return
	  	console.log 'message Sent'

