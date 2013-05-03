$(document).ready ->
	# hack the planet with Socket!
	socket = io.connect('http://localhost')
	# Ok ready!
	socket.on 'connection', (data) ->
			console.log data
	# initial validation email
	$('#registerEmail').validate
		rules:
			email:
				email: true
				required: true
		# Alternative message
		messages:
			email: "ingresa un email valido"
	# remove items that prevent validation
	$('#registerEmail').removeAttr 'novalidate'
	#confirm validation email
	$('#register').on 'click', (event) ->
		# validation null and ""
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
			$('#dataInfo').append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil profesional</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Sincronizar portafolios creativos (devianArt y Behance)</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Compartir con mis redes sociales</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Manejar mi propiedad intelectual</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Mi mercadeo y comunicaciones</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Usar <em>toolkit</em> para manejar mi carrera creativa</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Finanzas para creativos</label><label for="checkbox8"><input type="checkbox" id="checkbox8" style="display: none;"><span class="custom checkbox"></span> Vender mis servicios y obras</label><label for="checkbox9"><input type="checkbox" id="checkbox9" style="display: none;"><span class="custom checkbox"></span> Solicitar asesoría especializada</label><label for="checkbox10"><input type="checkbox" id="checkbox10" style="display: none;"><span class="custom checkbox"></span> Acceso a cursos online</label><label for="checkbox11"><input type="checkbox" id="checkbox11" style="display: none;"><span class="custom checkbox"></span> Aplicar a ofertas</label><label for="checkbox12"><input type="checkbox" id="checkbox12" style="display: none;"><span class="custom checkbox"></span> Ver concursos</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
		else if profile is 'Fan'
			$('fieldset').append('<legend>Perfil de Fan</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil y comenzar la experiencia</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Crear mi <em>“play list”</em> de artistas digitales</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Actividades para fans (concursos y juegos)</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Votar por mi artista favorito</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span>	Ganar puntos</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Ganar premios</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
		else if profile is 'Patrocinador'
			$('fieldset').append('<legend>Perfil de Patrocinador</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><label for="name">Nombre de la Empresa</label><input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad de contacto" id="city"><label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas"><label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Cómo patrocinar un concurso</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Cómo crear concurso de promoción comercial</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Publicidad para marcas y empresas</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Acceso a concursos</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Acceso a información de Artistas</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Acceso a ranking de artistas</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Publicar oferta de trabajo freelance</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
		else
			$('fieldset').append('<legend>No seleccionaste Perfil</legend>')
			$('#dataInfo').append('<div id="dataInfoDetail"><span>¡No seleccionaste opción valida!</span></div>')

		$('#sendAllInfo').on "click", (event) ->
			data = new Object()
			console.log $('#name').val()
			console.log $('#checkbox1').is(':checked')
