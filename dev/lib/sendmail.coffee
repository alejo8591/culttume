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
		    contents		: "<h3>¡Genial! lo estas haciendo muy bien. Ahora, activa los pasos 2 y 3 de tu registro copiando el código: </h3><h2>" + 
		    				  registerCode + 
		    				  "</h2>"+
		    				  "<p>Pronto serás uno/a de los primeros/as en tener acceso a nuestra versión Beta.</p>"+
		    				  "<p>Te invitamos a participar y activar sorpresas siguiéndonos en nuestras redes sociales: </p>"+
		    				  "<ul>"+
		    				  "<li>Fan page: fb.com/culttu.me</li>"+
		    				  "<li>Twitter: @culttume</li>"+
		    				  "<li>Blog: culttume.blogspot.com</li>"+
		    				  "<li>Youtube: culttume</li>"+
		    				  "<p>Cúentanos todo lo que deseas hacer, en nuestra plataforma como: seguidor/Fan o Artista/Creativo al correo </p>"+
		    				  "<ul><li>culttu.me@gmail.com</li></ul>"+
		    				  "<p>Te aseguramos que respondemos absolutamente todos los mensajes.</p>"+
		    				  "<p><strong>El equipo de culttu.me</strong></p>"
	  	]

	console.log 'sending Mail'

	# sender email
	transports =  transport.sendMail message, (error) ->
	  	if error
	  		console.log "Error ocurred"
	  		console.log error.message
	  		return
	  	console.log 'message Sent'