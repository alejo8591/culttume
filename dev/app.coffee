# requirements libraries
express  = require('express')
app      = express()
http     = require('http')
# server `http`
server   = http.createServer(app)
# including the server socket.io and Express project
io       = require('socket.io').listen server
# use librarie `path`
path     = require 'path'
# build objetc with `culttume` -> `controllers`
culttume = require './controllers/culttume'
#import moongose objects
# Model for schema `User`
User = culttume.user
# import `sendmail` librarie
mail = require './lib/sendmail'
statusRegister = 
	emailCreatedSuccefully : 1
	emailDuplicate      : 11000
	updateCorrectly     : 2
	verificationCodeOk  : 3
	verificationCodeFail: 4
# config Express
app.configure ->
	app.set 'port', process.env.PORT || 3030
	app.set 'views', __dirname + '/views'
	app.set 'view engine', 'jade'
	app.use express.favicon()
	app.use express.logger('dev')
	app.use express.bodyParser()
	app.use express.methodOverride()
	app.use(express.static __dirname + '/public')
	app.use app.router
# enviroment for developers
app.configure 'development', ->
	app.use express.errorHandler()
# routes and paths for app
app.get '/', culttume.index
# app.post '/register', culttume.register
app.get '/lists', culttume.lists

io.sockets.on 'connection', (socket) ->
	socket.emit 'conected', respond:'conected'
	# register email socket emit
	socket.on 'registerEmail', (email)->
		# object User
		registerCode = Math.random().toString(36).substr 2, 8
		users = new User(
			email: email.toLowerCase() 
			registerCode: registerCode
			useRegistrationCode: 0
		)
		users.save (err)->
			unless err
				console.log 'created'
				# mail.sendmail(user.toLowerCase(), registerCode)
				socket.emit 'fillData', 
				email:users.email 
				status:statusRegister.emailCreatedSuccefully
			else
				socket.emit 'fillData', 
				email:users.email 
				status:statusRegister.emailDuplicate
				console.log err

	# Verification code
	socket.on 'verificationCode', (code) ->
		User.findOne(
			'registerCode':code,
			'useRegistrationCode':0
			'email',
			(err, user) ->
				if user is null
					socket.emit 'receiveDataProfile', status:statusRegister.verificationCodeFail
				else
					socket.emit 'receiveDataProfile', status:statusRegister.verificationCodeOk	
		)
# Run Server 'hack the planet'
server.listen(app.get('port'), ->
	console.log 'Express server listen on port', app.get 'port')