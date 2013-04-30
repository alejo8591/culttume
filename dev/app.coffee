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
	# other option
	socket.on 'click', (email)->
		culttume.register(email)
		socket.emit 'pulseCount'

	socket.on 'otherClick',->
		culttume.user.findOne email: 'laui@rot.co', (err, users) ->
			handleError(err) if err
			socket.emit 'returnList', user: users

server.listen(app.get('port'), ->
	console.log 'Express server listen on port', app.get 'port')