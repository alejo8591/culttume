$(document).ready ->
	socket = io.connect('http://localhost')

	toggle =  ->
		$('#disconected').toggleClass 'hide'
		$('#connected').toggleClass 'hide'

	socket.on 'conected', (data) ->
			toggle()
			console.log data

	$('#button').click ->
		socket.emit 'click'

	socket.on 'pulseCount', (clicks) ->
		console.log 'Clicks: ' + clicks
		$('#connected').append '<h2>Has pulsado ' + clicks + ' veces'

	socket.on 'disconnect', ->
		console.log 'Disconnect'
		toggle()