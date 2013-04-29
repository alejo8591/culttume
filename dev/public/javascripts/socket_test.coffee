$(document).ready ->
	socket = io.connect('http://localhost')

	toggle =  ->
		$('#disconected').toggleClass 'hide'
		$('#connected').toggleClass 'hide'

	socket.on 'conected', (data) ->
			toggle()
			console.log data

	$('#button').click ->
		console.log $('#email').val()
		socket.emit 'click', $('#email').val() 

	socket.on 'pulseCount', (clicks) ->
		console.log 'Clicks: ' + clicks
		$('#connected').append '<h2>Has pulsado ' + clicks + ' veces'

	socket.on 'disconnect', ->
		console.log 'Disconnect'
		toggle()