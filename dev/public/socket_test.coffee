socket = io.connect 'http://192.168.1.106:7576'
socket.on 'news', (data) ->
	console.log data
	socket.emit 'my other event', my: 'data'
