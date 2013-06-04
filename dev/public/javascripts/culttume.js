(function() {
  $(document).ready(function() {
    /*	
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
    */

    var socket;

    $('ol').hide();
    $(window).load(function() {
      return $('#firstTip').joyride({
        nextButton: false,
        tipAnimation: 'fade',
        tipAnimationFadeSpeed: 300,
        timer: 3000
      });
    });
    socket = io.connect('http://192.168.1.106');
    socket.on('connection', function(data) {
      return console.log(data);
    });
    $('input#email').verimail({
      denyTempEmailDomains: true,
      messageElement: 'p#status-message'
    });
    $('#register').on('click', function(event) {
      var email, verification;

      email = $('#email').val();
      verification = new Comfirm.AlphaMail.Verimail();
      return verification.verify(email, function(status, message, suggestion) {
        if (status < 0) {
          return $('#email').addClass('error'.append('<small class="error" id="errorEmail">Correo invalido</small>'));
        } else {
          $('#enterEmail').removeClass('error');
          $('#errorEmail').remove();
          $('#email').removeClass('error');
          return socket.emit('registerEmail', $('#email').val());
        }
      });
    });
    socket.on('fillData', function(data) {
      if (data.status === 1) {
        $('#wrongEmail').remove();
        $('#results').append('<h3>Gracias ' + data.email + ' por tu registro</h3>');
        $('#moreData').reveal();
      } else {
        $('#moreData').remove();
        $('#wrongEmail').reveal();
      }
      return this.dataEmail;
    });
    socket.on('disconnect', function() {
      return console.log('Disconnect');
    });
    return $('#allInfo').stepy({
      backLabel: 'Atras',
      enter: true,
      description: false,
      legend: false,
      nextLabel: 'Siguiente Paso',
      transition: 'fade',
      finishButton: true,
      next: function() {
        if ($('li.stepy-active div').text() === 'Paso 1') {
          if ($('#profile').val() === 'Artista Visual' && $('#askAbout').val() !== 'Escoge una opción' && $('#registerCode').val() !== "" && $('#registerCode').val().length >= 8) {
            socket.emit('verificationCode', {
              code: $('#registerCode').val(),
              email: $('#email').val()
            });
            return socket.on('receiveDataProfile', function(dataCode) {
              if (dataCode.status === 3) {
                return $('#dataInfo').empty().append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años" id="age"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div></div>');
              } else {
                return $('#dataInfo').empty().append('<h3>Este código no existe, verifica tu correo electrónico</h3>');
              }
            });
          } else if ($('#profile').val() === 'Fan o Seguidor' && $('#askAbout').val() !== 'Escoge una opción') {
            socket.emit('verificationCode', {
              code: $('#registerCode').val(),
              email: $('#email').val()
            });
            return socket.on('receiveDataProfile', function(dataCode) {
              if (dataCode.status === 3) {
                return $('#dataInfo').empty().append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label><input id="name" type="text" name="name" placeholder="Nombres Apellidos"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city"><label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años" id="age"><label>Genero</label><select id="genre" style="display: none;"><option selected>Selecciona tu Genero</option><option>Femenino</option><option>Masculino</option></select><div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a><ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div></div>');
              } else {
                return $('#dataInfo').empty().append('<h3>Este código no existe, verifica tu correo electrónico</h3>');
              }
            });
          } else if ($('#profile').val() === 'Patrocinador' && $('#askAbout').val() !== 'Escoge una opción') {
            return $('#dataInfo').empty().append('<div id="dataInfoDetail"><label for="name">Nombre de la Empresa</label><input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad de contacto" id="city"><label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas"><label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"></div>');
          } else {
            return $('#dataInfo').empty().append('<div id="dataInfoDetail"><span>¡No seleccionaste alguna de las opciones ya casi consigues 200 Puntos!</span></div>');
          }
        } else if ($('li.stepy-active div').text() === 'Paso 2') {
          if ($('#profile').val() === 'Artista Visual' && $('#askAbout').val() !== 'Escoge una opción') {
            return $('#dataValidation').empty().append('<div id="dataValidationDetail"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil profesional</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Sincronizar portafolios creativos (devianArt y Behance)</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Compartir con mis redes sociales</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Manejar mi propiedad intelectual</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Mi mercadeo y comunicaciones</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Usar <em>toolkit</em> para manejar mi carrera creativa</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Finanzas para creativos</label><label for="checkbox8"><input type="checkbox" id="checkbox8" style="display: none;"><span class="custom checkbox"></span> Vender mis servicios y obras</label><label for="checkbox9"><input type="checkbox" id="checkbox9" style="display: none;"><span class="custom checkbox"></span> Solicitar asesoría especializada</label><label for="checkbox10"><input type="checkbox" id="checkbox10" style="display: none;"><span class="custom checkbox"></span> Acceso a cursos online</label><label for="checkbox11"><input type="checkbox" id="checkbox11" style="display: none;"><span class="custom checkbox"></span> Aplicar a ofertas</label><label for="checkbox12"><input type="checkbox" id="checkbox12" style="display: none;"><span class="custom checkbox"></span> Ver concursos</label><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small></div>');
          } else if ($('#profile').val() === 'Fan o Seguidor' && $('#askAbout').val() !== 'Escoge una opción') {
            return $('#dataValidation').empty().append('<div id="dataValidationDetail"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Crear perfil y comenzar la experiencia</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Crear mi <em>“play list”</em> de artistas digitales</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Actividades para fans (concursos y juegos)</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Votar por mi artista favorito</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span>	Ganar puntos</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Ganar premios</label><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small></div>');
          } else if ($('#profile').val() === 'Patrocinador' && $('#askAbout').val() !== 'Escoge una opción') {
            return $('#dataValidation').empty().append('<div id="dataValidationDetail"><label for="name">Nombre de la Empresa</label><input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad de contacto" id="city"><label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas"><label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"><h5>Escoge las opciones que te interesan:</h5><label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;"><span class="custom checkbox"></span> Cómo patrocinar un concurso</label><label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;"><span class="custom checkbox"></span> Cómo crear concurso de promoción comercial</label><label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;"><span class="custom checkbox"></span> Publicidad para marcas y empresas</label><label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;"><span class="custom checkbox"></span> Acceso a concursos</label><label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;"><span class="custom checkbox"></span> Acceso a información de Artistas</label><label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;"><span class="custom checkbox"></span> Acceso a ranking de artistas</label><label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;"><span class="custom checkbox"></span> Publicar oferta de trabajo freelance</label><br /><label>Ingresa el código que llego a tu correo electrónico</label><input type="text" name="registerCode" placeholder="Código alfanumérico de 8 digitos"><br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small><br /><a id="sendAllInfo" class="radius success button">Enviar!</a></div>');
          } else {
            return $('#dataValidation').empty().append('<div id="dataInfoDetail"><span>¡No seleccionaste alguna de las opciones ya casi consigues 200 Puntos!</span></div>');
          }
        } else {
          return console.log('paso 1');
        }
      },
      finish: function() {
        var check, data, selectOption, _i;

        data = {};
        data.services = [];
        data.profile = $('#profile').val();
        data.askAbout = $('#askAbout').val();
        data.name = $('#name').val();
        data.city = $('#city').val();
        data.age = $('#age').val();
        data.email = $('#email').val();
        selectOption = $('#genre').find('option:selected');
        data.genre = selectOption.val();
        if ($('#profile').val() === 'Artista Visual') {
          _i = 1;
          while (_i < 13) {
            check = '#checkbox' + _i;
            if ($(check).is(':checked') === true) {
              data.services.push(_i);
            }
            _i++;
          }
        } else if ($('#profile').val() === 'Fan o Seguidor') {
          _i = 1;
          while (_i < 7) {
            check = '#checkbox' + _i;
            if ($(check).is(':checked') === true) {
              data.services.push(_i);
            }
            _i++;
          }
        }
        if (data.services.length > 0 && data.profile !== 'Escoge una opción' && data.askAbout !== 'Escoge una opción' && data.name !== "" && data.name.length >= 5 && data.city !== "" && data.city.length >= 3 && data.age !== "" && data.age.length > 1 && data.age.length < 3 && data.genre !== 'Selecciona tu Genero') {
          socket.emit('receiveAllDataProfile', data);
          $('#congratulation').reveal();
        } else {
          alert('revisa algunos datos estan mal');
        }
        return false;
      }
    });
  });

}).call(this);
