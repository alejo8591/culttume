nodemailer = require 'nodemailer'

exports.sendmail= (emailPersonal)->
	# Create a SMTP transport object
	transport = nodemailer.createTransport "SMTP", 
				service : 'Gmail'
				auth    :
					user: "culttu.me@gmail.com"
					pass: "INGRESO12345!"

	console.log 'SMTP configured'

	# Message object
	message = 
		#sender info
		from : '"culttu.me" <culttu.me@gmail.com>'
		# Comma separated list of recipients
		to   : emailPersonal 
		# Subject of the message
		subject: '¡Bienvenido a culttume!'

		text: 'Plaintext'
		# An array of alternatives
		alternatives: [
		    contentType		: "text/x-web-markdown"
		    contents		: "**markdown** alternative"
		  	,
		    contentType		: "text/html; charset=utf-8"
		    contentEncoding: "7bit"
		    contents		: "<h1>Gracias por pertencer a culttume!</h1><h2>Confirma si te llego el correo ;)</h2>"
	  	]

	console.log 'sending Mail'

	# sender email
	transports =  transport.sendMail message, (error) ->
	  	if error
	  		console.log "Error ocurred"
	  		console.log error.message
	  		return
	  	console.log 'message Sent'

