$(document).ready ->
	###	
		$('#imgs li').wookmark( 
			align: 'center'
			autoResize: true
			container: $('#rightCulttume')
			itemWidth: 0
			offset: 2
			resizeDelay: 50
			flexibleWidth: 0
			onLayoutChanged: undefined
	  	)
	###
	# <ol> hide
	$('ol').hide()
	$(window).load(()->
		$('#firstTip').joyride
			nextButton : false
			tipAnimation: 'fade'
			tipAnimationFadeSpeed:300
			timer: 3000
	)
	# hack the planet with Socket!
	socket = io.connect('http://192.168.1.106')
	# Ok ready!
	socket.on 'connection', (data) ->
			console.log data

	# initial validation email
	$('input#email').verimail(
		denyTempEmailDomains : true
		messageElement: 'p#status-message'
	)
	# Validation email
	###
		$('input#email').on 'change', (event) ->
			if $('input#email').val().length > 10
				$('#register').removeClass('radius alert button')
				.addClass('radius success button')
				.attr('data-reveal-id', 'moreData')
				.text('Enviar')
			else
				$('#register').removeClass('radius success button')
				.addClass('radius button alert')
				.removeAttr('data-reveal-id')
				.text('¡Registrate!')
	###
	# confirm validation email
	$('#register').on 'click', (event) ->
		# validation null and ""
		email = $('#email').val()
		verification = new Comfirm.AlphaMail.Verimail()
		# final validation
		verification.verify(email, (status, message,suggestion)->
			if status < 0
				$('#email').addClass 'error'
				# $('#enterEmail').addClass('error')
				.append '<small class="error" id="errorEmail">Correo invalido</small>' 
			else
				$('#enterEmail').removeClass 'error'
				$('#errorEmail').remove()
				$('#email').removeClass 'error'
				socket.emit 'registerEmail', $('#email').val()
		)
	# 
	socket.on 'fillData', (data) ->
		if data.status is 1
			$('#wrongEmail').remove()
			$('#results').append '<h3>Gracias ' + data.email + ' por tu registro</h3>'
			$('#moreData').reveal()
		else
			$('#moreData').remove()
			$('#wrongEmail').reveal()

	# Socket for disconnect for the app
	socket.on 'disconnect', ->
		console.log 'Disconnect'

	$('#allInfo').stepy(
		backLabel: 'Atras'
		description: false
		legend: false
		nextLabel: 'Siguiente Paso'
		transition: 'fade'
		# validate: true
		next: ()->
			#first step for validation
			if $('li.stepy-active div').text() is 'Paso 1'
				if $('#profile').val() is 'Artista Visual' and $('#askAbout').val() isnt 'Escoge una opción' and $('#registerCode').val() isnt "" and $('#registerCode').val().length >= 8
					socket.emit 'verificationCode', $('#registerCode').val()
					socket.on 'receiveDataProfile', (dataCode)->
						if dataCode.status is 3
							$('#dataInfo').empty()
										  .append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div></div>')
						else 
							$('#dataInfo').empty()
										  .append('<h3>Este código no existe, verifica tu correo electrónico</h3>')
				else if $('#profile').val() is 'Fan o Seguidor' and $('#askAbout').val() isnt 'Escoge una opción'
					$('#dataInfo').empty()
								  .append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div></div>')
				else if $('#profile').val() is 'Patrocinador' and $('#askAbout').val() isnt 'Escoge una opción'
					$('#dataInfo').empty()
								  .append('<div id="dataInfoDetail"><label for="name">Nombre de la Empresa</label><input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad de contacto" id="city"><label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas"><label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"></div>')
				else
					$('#dataInfo').empty()
					              .append('<div id="dataInfoDetail"><span>¡No seleccionaste alguna de las opciones ya casi consigues 200 Puntos!</span></div>')
			# Next step
			else if $('li.stepy-active div').text() is 'Paso 2'
				if $('#profile').val() is 'Artista Visual' and $('#askAbout').val() isnt 'Escoge una opción'
					$('#dataValidation').empty()
								  .append('<div id="dataValidationDetail"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil profesional</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Sincronizar portafolios creativos (devianArt y Behance)</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Compartir con mis redes sociales</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Manejar mi propiedad intelectual</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Mi mercadeo y comunicaciones</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Usar <em>toolkit</em> para manejar mi carrera creativa</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Finanzas para creativos</label><label for="checkbox8"><input type="checkbox" id="checkbox8" style="display: none;"><span class="custom checkbox"></span> Vender mis servicios y obras</label><label for="checkbox9"><input type="checkbox" id="checkbox9" style="display: none;"><span class="custom checkbox"></span> Solicitar asesoría especializada</label><label for="checkbox10"><input type="checkbox" id="checkbox10" style="display: none;"><span class="custom checkbox"></span> Acceso a cursos online</label><label for="checkbox11"><input type="checkbox" id="checkbox11" style="display: none;"><span class="custom checkbox"></span> Aplicar a ofertas</label><label for="checkbox12"><input type="checkbox" id="checkbox12" style="display: none;"><span class="custom checkbox"></span> Ver concursos</label><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small></div>')
				else if $('#profile').val() is 'Fan o Seguidor' and $('#askAbout').val() isnt 'Escoge una opción'
					$('#dataValidation').empty()
								  .append('<div id="dataValidationDetail"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil y comenzar la experiencia</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Crear mi <em>“play list”</em> de artistas digitales</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Actividades para fans (concursos y juegos)</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Votar por mi artista favorito</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span>	Ganar puntos</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Ganar premios</label><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small></div>')
				else if $('#profile').val() is 'Patrocinador' and $('#askAbout').val() isnt 'Escoge una opción'
					$('#dataValidation').empty()
								  .append('<div id="dataValidationDetail"><label for="name">Nombre de la Empresa</label><input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad de contacto" id="city"><label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas"><label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Cómo patrocinar un concurso</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Cómo crear concurso de promoción comercial</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Publicidad para marcas y empresas</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Acceso a concursos</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Acceso a información de Artistas</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Acceso a ranking de artistas</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Publicar oferta de trabajo freelance</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
				else
					$('#dataValidation').empty()
					              .append('<div id="dataInfoDetail"><span>¡No seleccionaste alguna de las opciones ya casi consigues 200 Puntos!</span></div>')
			else
				console.log 'paso 1'

	)
###
	()-> 
			$('#profile').on 'change', (event) ->
				$('#dataInfoDetail').remove()
				$('legend').remove()
				profile = $(this).val()
				if profile is 'Artista Visual'
					$('fieldset').append('<legend>Perfil de Artista Visual</legend>')
					$('#dataInfo').append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres y Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil profesional</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Sincronizar portafolios creativos (devianArt y Behance)</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Compartir con mis redes sociales</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Manejar mi propiedad intelectual</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Mi mercadeo y comunicaciones</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Usar <em>toolkit</em> para manejar mi carrera creativa</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Finanzas para creativos</label><label for="checkbox8"><input type="checkbox" id="checkbox8" style="display: none;"><span class="custom checkbox"></span> Vender mis servicios y obras</label><label for="checkbox9"><input type="checkbox" id="checkbox9" style="display: none;"><span class="custom checkbox"></span> Solicitar asesoría especializada</label><label for="checkbox10"><input type="checkbox" id="checkbox10" style="display: none;"><span class="custom checkbox"></span> Acceso a cursos online</label><label for="checkbox11"><input type="checkbox" id="checkbox11" style="display: none;"><span class="custom checkbox"></span> Aplicar a ofertas</label><label for="checkbox12"><input type="checkbox" id="checkbox12" style="display: none;"><span class="custom checkbox"></span> Ver concursos</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
				else if profile is 'Fan'
					$('fieldset').append('<legend>Perfil de Fan</legend>')
					$('#dataInfo').append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres y Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil y comenzar la experiencia</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Crear mi <em>“play list”</em> de artistas digitales</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Actividades para fans (concursos y juegos)</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Votar por mi artista favorito</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span>	Ganar puntos</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Ganar premios</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
				else if profile is 'Patrocinador'
					$('fieldset').append('<legend>Perfil de Patrocinador</legend>')
					$('#dataInfo').append('<div id="dataInfoDetail"><label for="name">Nombre de la Empresa</label><input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad de contacto" id="city"><label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas"><label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Cómo patrocinar un concurso</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Cómo crear concurso de promoción comercial</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Publicidad para marcas y empresas</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Acceso a concursos</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Acceso a información de Artistas</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Acceso a ranking de artistas</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Publicar oferta de trabajo freelance</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>')
				else
					$('fieldset').append('<legend>No seleccionaste Perfil</legend>')
					$('#dataInfo').append('<div id="dataInfoDetail"><span>¡No seleccionaste una opción valida!</span></div>')

				$('#sendAllInfo').on 'click', (event) ->
					data = new Object()
					console.log $('#name').val()
					console.log $('#checkbox1').is(':checked')
	
	# depending load profile form

###