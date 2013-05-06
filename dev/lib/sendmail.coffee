nodemailer = require 'nodemailer'
###
	
###
exports.sendmail= (emailPersonal, registerCode)->
	# Create a SMTP transport object
	transport = nodemailer.createTransport 'SMTP', 
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
		subject: 'Bienvenido a culttume'

		text: 'Plaintext'
		# An array of alternatives
		alternatives: [
		    contentType		: "text/x-web-markdown"
		    contents		: "**markdown** alternative"
		  	,
		    contentType		: "text/html; charset=utf-8"
		    contentEncoding: "7bit"
		    contents		: "<h3>¡Genial! Ahora, activa tu registro copiando el código: </h3><h2>" + registerCode + "</h2><p>Pronto serás de los primeros en usar nuestra versión Beta.</p><p> Te invitamos a seguirnos en nuestras redes sociales y a enviarnos tus sugerencias. Escríbenos a culttu.me@gmail.com, te aseguramos que respondemos absolutamente todos los mensajes.</p><ul><li>Fan page: fb.com/culttu.me</li><li>Twitter: @culttume</li><li>Blog: culttume.blogspot.com</li></ul><p><strong>El equipo de culttu.me</strong></p>"
	  	]

	console.log 'sending Mail'

	# sender email
	transports =  transport.sendMail message, (error) ->
	  	if error
	  		console.log "Error ocurred"
	  		console.log error.message
	  		return
	  	console.log 'message Sent'