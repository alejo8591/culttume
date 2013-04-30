$(document).ready ->
	socket = io.connect('http://localhost')

	socket.on 'connection', (data) ->
			console.log data

	$('#button').click ->
		console.log $('#email').val()
		socket.emit 'click', $('#email').val() 

	$('#button1').click ->
		socket.emit 'otherClick'

	socket.on 'returnList', (list) ->
		console.log list
		$('#results').append '<h2>' + list.user.email


	socket.on 'pulseCount', ->
		console.log 'email created'
		$('#results').append '<h2>Gracias por tu registro</h2>'

	socket.on 'disconnect', ->
		console.log 'Disconnect'