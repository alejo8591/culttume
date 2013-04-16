express 	= require('express')
http 		= require('http')
path 		= require('path')
routes 		= require('./routes/culttume')
mongoose 	= require('mongoose')

app = express()

app.configure ->
	app.set 'port', process.env.PORT or 7575
	app.set 'views', __dirname + '/views'
	app.set 'view engine', 'jade'
	app.use express.logger('dev') 
	app.use express.favicon()
	app.use express.bodyParser()
	app.use express.methodOverride()
	app.use app.router
	app.use express.static(path.join __dirname, 'public')

app.configure 'development', ->
	app.use express.errorHandler()

app.get '/', routes.index
# app.post '/register', routes.register

http.createServer(app).listen app.get('port'), -> 
	console.log "Listening " + app.get('port')