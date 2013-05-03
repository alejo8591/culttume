$(document).ready ->
	socket = io.connect('http://localhost')

	socket.on 'connection', (data) ->
			console.log data
	
	$('#registerEmail').validate
		rules:
			email:
				email: true
				required: true

		messages:
			email: "ingresa un email valido"

	$('#registerEmail').removeAttr('novalidate')

	$('#register').on 'click', (event) ->
		email = $('#email').val()
		if email isnt "" and email isnt `undefined`
			$('#enterEmail').removeClass 'error'
			$('#errorEmail').remove()
			$('#email').removeClass 'error'
			socket.emit 'registerEmail', $('#email').val() 
		else
			$('#enterEmail').addClass 'error'
			$('#email').addClass 'error'
			$('#enterEmail').append '<small class="error" id="errorEmail">Correo invalido</small>'

	$('#consult').click ->
		socket.emit 'otherClick'

	socket.on 'returnList', (list) ->
		console.log list
		$('#results').append '<h2>' + list.user.email


	socket.on 'fillData', (data) ->
		console.log 'email created'
		console.log data
		$('#results').append '<h3>Gracias ' + data.email + ' por tu registro</h3>'

	socket.on 'disconnect', ->
		console.log 'Disconnect'
	# depending load profile form
	$('#profile').on "change", (event) ->
		$('#dataInfoDetail').remove()
		$('legend').remove()
		profile = $(this).val()
		if profile is 'Artista Visual'
			$('fieldset').append('<legend>Perfil de Artista Visual</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><h4>Artista Visual</h4></div>')
		else if profile is 'Fan'
			$('fieldset').append('<legend>Perfil de Fan</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><h4>Fan</h4></div>')
		else if profile is 'Patrocinador'
			$('fieldset').append('<legend>Perfil de Patrocinador</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><h4>Patrocinador</h4></div>')
		else
			$('fieldset').append('<legend>No seleccionaste Perfil</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><span>¡No seleccionaste opción valida!</span></div>')