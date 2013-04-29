express  = require('express')
app      = express()
http     = require('http')
server   = http.createServer(app)
io       = require('socket.io').listen server
path     = require 'path'
culttume = require './controllers/culttume'

app.configure ->
	app.set 'port', process.env.PORT || 3030
	app.set 'views', __dirname + '/views'
	app.set 'view engine', 'jade'
	app.use express.favicon()
	app.use express.logger('dev')
	app.use express.bodyParser()
	app.use express.methodOverride()
	app.use(express.static(__dirname + '/public'))
	app.use app.router

app.configure 'development', ->
	app.use express.errorHandler()

app.get '/', culttume.index
app.post '/register', culttume.register
app.get '/list', culttume.list

io.sockets.on "connection", (socket) ->
  socket.emit "news",
    hello: "world"

  socket.on "my other event", (data) ->
    console.log data

server.listen(app.get('port'), ->
	console.log 'Express server listen on port', app.get 'port')