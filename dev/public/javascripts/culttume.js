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
    socket = io.connect('http://localhost');
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
        progressBar(30, $('#progressBar'));
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
                $('#dataInfo').empty().append('<label>Pais</label><select id="country" style="display: none;">' + '<option selected>Pais</option>' + '<option>Colombia</option>' + '<option>Panamá</option>' + '</select>' + '<div class="custom dropdown">' + '<a href="#" class="current">Selecciona tu Pais</a>' + '<a href="#" class="selector"></a><ul><li>Selecciona tu Pais</li>' + '<li>Colombia</li>' + '<li>Panamá</li>' + '</ul></div>' + '<div id="dataInfoDetail">');
                progressBar(35, $('#progressBar'));
                return $('#country').change(function() {
                  var country;

                  country = $('#country').find('option:selected');
                  if (country.val() === 'Colombia') {
                    $('#dataInfoDetail').empty();
                    $('#dataInfoDetail').append('<label>Ciudad</label>' + '<select id="city" style="display: none;">' + '<option selected>Selecciona tu Ciudad</option>' + '<option>Acacías</option>' + '<option>Aguachica</option>' + '<option>Aguazul</option>' + '<option>Agustín Codazzi</option>' + '<option>Andes</option>' + '<option>Anserma</option>' + '<option>Apartadó</option>' + '<option>Aracataca</option>' + '<option>Arauca</option>' + '<option>Ariguani</option>' + '<option>Aguachica</option>' + '<option>Arjona</option>' + '<option>Armenia</option>' + '<option>Ayapel</option>' + '<option>Baraona</option>' + '<option>Barbosa(ANT)</option>' + '<option>Barbosa(SAN)</option>' + '<option>Barrancabermeja</option>' + '<option>Barranquilla</option>' + '<option>Bello</option>' + '<option>Bogotá D.C.</option>' + '<option>Bosconia</option>' + '<option>Bucaramanga</option>' + '<option>Buga(Guadalajar de Buga)</option>' + '<option>Caicedonia</option>' + '<option>Cajicá</option>' + '<option>Calarcá</option>' + '<option>Caldas</option>' + '<option>Cali</option>' + '<option>Campoalegre</option>' + '<option>Candelaria</option>' + '<option>Carepa</option>' + '<option>Carmen de Viboral</option>' + '<option>Cartagena (de Indias)</option>' + '<option>Cartago</option>' + '<option>Caucasia</option>' + '<option>Cereté</option>' + '<option>Chaparral</option>' + '<option>Chía</option>' + '<option>Chigorodó</option>' + '<option>Chinchiná</option>' + '<option>Chinú</option>' + '<option>Chiquinquirá</option>' + '<option>Ciénaga</option>' + '<option>Ciénaga de Oro</option>' + '<option>Circasia</option>' + '<option>Copacabana</option>' + '<option>Corozal</option>' + '<option>Cúcuta</option>' + '<option>Dos Quebradas</option>' + '<option>Duitama</option>' + '<option>El Bagre</option>' + '<option>El Banco</option>' + '<option>El Carmen de Bolívar</option>' + '<option>El Cerrito</option>' + '<option>El Santuario</option>' + '<option>Envigado</option>' + '<option>Espinal</option>' + '<option>Facatativá</option>' + '<option>Flandes</option>' + '<option>Florencia</option>' + '<option>Florida</option>' + '<option>Floridablanca</option>' + '<option>Fonseca</option>' + '<option>Fundación</option>' + '<option>Funza</option>' + '<option>Fusagasugá</option>' + '<option>Galapa</option>' + '<option>Garzón</option>' + '<option>Girardot</option>' + '<option>Girardota</option>' + '<option>Girón</option>' + '<option>Granada</option>' + '<option>Honda</option>' + '<option>Ibagué</option>' + '<option>Ipiales</option>' + '<option>Itagüí</option>' + '<option>Jamundí</option>' + '<option>La Ceja</option>' + '<option>La Dorada</option>' + '<option>La Estrella</option>' + '<option>La Plata</option>' + '<option>La Tebaida</option>' + '<option>La Unión</option>' + '<option>La Virginia</option>' + '<option>Leticia</option>' + '<option>Líbano</option>' + '<option>Lorica</option>' + '<option>Los Patios</option>' + '<option>Madrid</option>' + '<option>Magangué</option>' + '<option>Maicao</option>' + '<option>Malambo</option>' + '<option>Manaure</option>' + '<option>Manizales</option>' + '<option>Marinilla</option>' + '<option>Mariquita</option>' + '<option>Medellín</option>' + '<option>Mariquita</option>' + '<option>Melgar</option>' + '<option>Miranda</option>' + '<option>Mitú</option>' + '<option>Mocoa</option>' + '<option>Mompós</option>' + '<option>Montelíbano</option>' + '<option>Montenegro</option>' + '<option>Montería</option>' + '<option>Mosquera</option>' + '<option>Neiva</option>' + '<option>Ocaña</option>' + '<option>Orito</option>' + '<option>Palmar de Varela</option>' + '<option>Palmira</option>' + '<option>Pamplona</option>' + '<option>Pasto</option>' + '<option>Pereira</option>' + '<option>Piedecuesta</option>' + '<option>Pitalito</option>' + '<option>Pivijay</option>' + '<option>Planeta Rica</option>' + '<option>Plato</option>' + '<option>Popayán</option>' + '<option>Pradera</option>' + '<option>Puerto Asís</option>' + '<option>Puerto Berrío</option>' + '<option>Puerto Boyacá</option>' + '<option>Puerto Carreño</option>' + '<option>Puerto Colombia</option>' + '<option>Puerto Inírida</option>' + '<option>Puerto López</option>' + '<option>Puerto Tejada</option>' + '<option>Quibdó</option>' + '<option>Quimbaya</option>' + '<option>Riohacha</option>' + '<option>Rionegro</option>' + '<option>Roldanillo</option>' + '<option>Sabanagrande</option>' + '<option>Sabaneta</option>' + '<option>Sahagún</option>' + '<option>Sampués</option>' + '<option>San Andrés</option>' + '<option>San Gil</option>' + '<option>San Jacinto</option>' + '<option>San José del Guaviare</option>' + '<option>San Juan del Cesar</option>' + '<option>San Juan de Nepomuceno</option>' + '<option>San Marcos</option>' + '<option>San Martín</option>' + '<option>San Onofre</option>' + '<option>San Pablo</option>' + '<option>Santa Marta</option>' + '<option>Santander de Quilichao</option>' + '<option>Santa Rosa de Cabal</option>' + '<option>Santo Tomás</option>' + '<option>San Vicente del Caguán</option>' + '<option>Saravena</option>' + '<option>Segovia</option>' + '<option>Sevilla</option>' + '<option>Sibaté</option>' + '<option>Sincé</option>' + '<option>Sincelejo</option>' + '<option>Soacha</option>' + '<option>Socorro</option>' + '<option>Sogamoso</option>' + '<option>Soledad</option>' + '<option>Tame</option>' + '<option>Tarazá</option>' + '<option>Tierralta</option>' + '<option>Tolú</option>' + '<option>Tumaco</option>' + '<option>Tunja</option>' + '<option>Turbaco</option>' + '<option>Turbo</option>' + '<option>Ubaté</option>' + '<option>Valledupar</option>' + '<option>Villa del Rosario</option>' + '<option>Villamaría</option>' + '<option>Villavicencio</option>' + '<option>Yarumal</option>' + '<option>Yopal</option>' + '<option>Yumbo</option>' + '<option>Zarzal</option>' + '<option>Zipaquirá</option>' + '</select>' + '<div class="custom dropdown">' + '<a href="#" class="current">Selecciona tu Ciudad</a>' + '<a href="#" class="selector"></a>' + '<ul>' + '<li>Selecciona tu Ciudad</li>' + '<li>Acacías</li>' + '<li>Aguachica</li>' + '<li>Aguazul</li>' + '<li>Agustín Codazzi</li>' + '<li>Andes</li>' + '<li>Anserma</li>' + '<li>Apartadó</li>' + '<li>Aracataca</li>' + '<li>Arauca</li>' + '<li>Ariguani</li>' + '<li>Aguachica</li>' + '<li>Arjona</li>' + '<li>Armenia</li>' + '<li>Ayapel</li>' + '<li>Baraona</li>' + '<li>Barbosa(ANT)</li>' + '<li>Barbosa(SAN)</li>' + '<li>Barrancabermeja</li>' + '<li>Barranquilla</li>' + '<li>Bello</li>' + '<li>Bogotá D.C.</li>' + '<li>Bosconia</li>' + '<li>Bucaramanga</li>' + '<li>Buga(Guadalajar de Buga)</li>' + '<li>Caicedonia</li>' + '<li>Cajicá</li>' + '<li>Calarcá</li>' + '<li>Caldas</li>' + '<li>Cali</li>' + '<li>Campoalegre</li>' + '<li>Candelaria</li>' + '<li>Carepa</li>' + '<li>Carmen de Viboral</li>' + '<li>Cartagena (de Indias)</li>' + '<li>Cartago</li>' + '<li>Caucasia</li>' + '<li>Cereté</li>' + '<li>Chaparral</li>' + '<li>Chía</li>' + '<li>Chigorodó</li>' + '<li>Chinchiná</li>' + '<li>Chinú</li>' + '<li>Chiquinquirá</li>' + '<li>Ciénaga</li>' + '<li>Ciénaga de Oro</li>' + '<li>Circasia</li>' + '<li>Copacabana</li>' + '<li>Corozal</li>' + '<li>Cúcuta</li>' + '<li>Dos Quebradas</li>' + '<li>Duitama</li>' + '<li>El Bagre</li>' + '<li>El Banco</li>' + '<li>El Carmen de Bolívar</li>' + '<li>El Cerrito</li>' + '<li>El Santuario</li>' + '<li>Envigado</li>' + '<li>Espinal</li>' + '<li>Facatativá</li>' + '<li>Flandes</li>' + '<li>Florencia</li>' + '<li>Florida</li>' + '<li>Floridablanca</li>' + '<li>Fonseca</li>' + '<li>Fundación</li>' + '<li>Funza</li>' + '<li>Fusagasugá</li>' + '<li>Galapa</li>' + '<li>Garzón</li>' + '<li>Girardot</li>' + '<li>Girardota</li>' + '<li>Girón</li>' + '<li>Granada</li>' + '<li>Honda</li>' + '<li>Ibagué</li>' + '<li>Ipiales</li>' + '<li>Itagüí</li>' + '<li>Jamundí</li>' + '<li>La Ceja</li>' + '<li>La Dorada</li>' + '<li>La Estrella</li>' + '<li>La Plata</li>' + '<li>La Tebaida</li>' + '<li>La Unión</li>' + '<li>La Virginia</li>' + '<li>Leticia</li>' + '<li>Líbano</li>' + '<li>Lorica</li>' + '<li>Los Patios</li>' + '<li>Madrid</li>' + '<li>Magangué</li>' + '<li>Maicao</li>' + '<li>Malambo</li>' + '<li>Manaure</li>' + '<li>Manizales</li>' + '<li>Marinilla</li>' + '<li>Mariquita</li>' + '<li>Medellín</li>' + '<li>Mariquita</li>' + '<li>Melgar</li>' + '<li>Miranda</li>' + '<li>Mitú</li>' + '<li>Mocoa</li>' + '<li>Mompós</li>' + '<li>Montelíbano</li>' + '<li>Montenegro</li>' + '<li>Montería</li>' + '<li>Mosquera</li>' + '<li>Neiva</li>' + '<li>Ocaña</li>' + '<li>Orito</li>' + '<li>Palmar de Varela</li>' + '<li>Palmira</li>' + '<li>Pamplona</li>' + '<li>Pasto</li>' + '<li>Pereira</li>' + '<li>Piedecuesta</li>' + '<li>Pitalito</li>' + '<li>Pivijay</li>' + '<li>Planeta Rica</li>' + '<li>Plato</li>' + '<li>Popayán</li>' + '<li>Pradera</li>' + '<li>Puerto Asís</li>' + '<li>Puerto Berrío</li>' + '<li>Puerto Boyacá</li>' + '<li>Puerto Carreño</li>' + '<li>Puerto Colombia</li>' + '<li>Puerto Inírida</li>' + '<li>Puerto López</li>' + '<li>Puerto Tejada</li>' + '<li>Quibdó</li>' + '<li>Quimbaya</li>' + '<li>Riohacha</li>' + '<li>Rionegro</li>' + '<li>Roldanillo</li>' + '<li>Sabanagrande</li>' + '<li>Sabaneta</li>' + '<li>Sahagún</li>' + '<li>Sampués</li>' + '<li>San Andrés</li>' + '<li>San Gil</li>' + '<li>San Jacinto</li>' + '<li>San José del Guaviare</li>' + '<li>San Juan del Cesar</li>' + '<li>San Juan de Nepomuceno</li>' + '<li>San Marcos</li>' + '<li>San Martín</li>' + '<li>San Onofre</li>' + '<li>San Pablo</li>' + '<li>Santa Marta</li>' + '<li>Santander de Quilichao</li>' + '<li>Santa Rosa de Cabal</li>' + '<li>Santo Tomás</li>' + '<li>San Vicente del Caguán</li>' + '<li>Saravena</li>' + '<li>Segovia</li>' + '<li>Sevilla</li>' + '<li>Sibaté</li>' + '<li>Sincé</li>' + '<li>Sincelejo</li>' + '<li>Soacha</li>' + '<li>Socorro</li>' + '<li>Sogamoso</li>' + '<li>Soledad</li>' + '<li>Tame</li>' + '<li>Tarazá</li>' + '<li>Tierralta</li>' + '<li>Tolú</li>' + '<li>Tumaco</li>' + '<li>Tunja</li>' + '<li>Turbaco</li>' + '<li>Turbo</li>' + '<li>Ubaté</li>' + '<li>Valledupar</li>' + '<li>Villa del Rosario</li>' + '<li>Villamaría</li>' + '<li>Villavicencio</li>' + '<li>Yarumal</li>' + '<li>Yopal</li>' + '<li>Yumbo</li>' + '<li>Zarzal</li>' + '<li>Zipaquirá</li>' + '</ul></div>');
                  } else if (country.val() === 'Panamá') {
                    $('#dataInfoDetail').empty();
                    $('#dataInfoDetail').append('<label>Ciudad</label>' + '<select id="city" style="display: none;">' + '<option selected>Selecciona tu Ciudad</option>' + '<option>Acacías</option>' + '<option>Aguachica</option>' + '<option>Aguazul</option>' + '<option>Agustín Codazzi</option>' + '<option>Andes</option>' + '<option>Anserma</option>' + '<option>Apartadó</option>' + '<option>Aracataca</option>' + '<option>Arauca</option>' + '<option>Ariguani</option>' + '<option>Aguachica</option>' + '<option>Arjona</option>' + '<option>Armenia</option>' + '<option>Ayapel</option>' + '<option>Baraona</option>' + '<option>Barbosa(ANT)</option>' + '<option>Barbosa(SAN)</option>' + '<option>Barrancabermeja</option>' + '<option>Barranquilla</option>' + '<option>Bello</option>' + '<option>Bogotá D.C.</option>' + '<option>Bosconia</option>' + '<option>Bucaramanga</option>' + '<option>Buga(Guadalajar de Buga)</option>' + '<option>Caicedonia</option>' + '<option>Cajicá</option>' + '<option>Calarcá</option>' + '<option>Caldas</option>' + '<option>Cali</option>' + '<option>Campoalegre</option>' + '<option>Candelaria</option>' + '<option>Carepa</option>' + '<option>Carmen de Viboral</option>' + '<option>Cartagena (de Indias)</option>' + '<option>Cartago</option>' + '<option>Caucasia</option>' + '<option>Cereté</option>' + '<option>Chaparral</option>' + '<option>Chía</option>' + '<option>Chigorodó</option>' + '<option>Chinchiná</option>' + '<option>Chinú</option>' + '<option>Chiquinquirá</option>' + '<option>Ciénaga</option>' + '<option>Ciénaga de Oro</option>' + '<option>Circasia</option>' + '<option>Copacabana</option>' + '<option>Corozal</option>' + '<option>Cúcuta</option>' + '<option>Dos Quebradas</option>' + '<option>Duitama</option>' + '<option>El Bagre</option>' + '<option>El Banco</option>' + '<option>El Carmen de Bolívar</option>' + '<option>El Cerrito</option>' + '<option>El Santuario</option>' + '<option>Envigado</option>' + '<option>Espinal</option>' + '<option>Facatativá</option>' + '<option>Flandes</option>' + '<option>Florencia</option>' + '<option>Florida</option>' + '<option>Floridablanca</option>' + '<option>Fonseca</option>' + '<option>Fundación</option>' + '<option>Funza</option>' + '<option>Fusagasugá</option>' + '<option>Galapa</option>' + '<option>Garzón</option>' + '<option>Girardot</option>' + '<option>Girardota</option>' + '<option>Girón</option>' + '<option>Granada</option>' + '<option>Honda</option>' + '<option>Ibagué</option>' + '<option>Ipiales</option>' + '<option>Itagüí</option>' + '<option>Jamundí</option>' + '<option>La Ceja</option>' + '<option>La Dorada</option>' + '<option>La Estrella</option>' + '<option>La Plata</option>' + '<option>La Tebaida</option>' + '<option>La Unión</option>' + '<option>La Virginia</option>' + '<option>Leticia</option>' + '<option>Líbano</option>' + '<option>Lorica</option>' + '<option>Los Patios</option>' + '<option>Madrid</option>' + '<option>Magangué</option>' + '<option>Maicao</option>' + '<option>Malambo</option>' + '<option>Manaure</option>' + '<option>Manizales</option>' + '<option>Marinilla</option>' + '<option>Mariquita</option>' + '<option>Medellín</option>' + '<option>Mariquita</option>' + '<option>Melgar</option>' + '<option>Miranda</option>' + '<option>Mitú</option>' + '<option>Mocoa</option>' + '<option>Mompós</option>' + '<option>Montelíbano</option>' + '<option>Montenegro</option>' + '<option>Montería</option>' + '<option>Mosquera</option>' + '<option>Neiva</option>' + '<option>Ocaña</option>' + '<option>Orito</option>' + '<option>Palmar de Varela</option>' + '<option>Palmira</option>' + '<option>Pamplona</option>' + '<option>Pasto</option>' + '<option>Pereira</option>' + '<option>Piedecuesta</option>' + '<option>Pitalito</option>' + '<option>Pivijay</option>' + '<option>Planeta Rica</option>' + '<option>Plato</option>' + '<option>Popayán</option>' + '<option>Pradera</option>' + '<option>Puerto Asís</option>' + '<option>Puerto Berrío</option>' + '<option>Puerto Boyacá</option>' + '<option>Puerto Carreño</option>' + '<option>Puerto Colombia</option>' + '<option>Puerto Inírida</option>' + '<option>Puerto López</option>' + '<option>Puerto Tejada</option>' + '<option>Quibdó</option>' + '<option>Quimbaya</option>' + '<option>Riohacha</option>' + '<option>Rionegro</option>' + '<option>Roldanillo</option>' + '<option>Sabanagrande</option>' + '<option>Sabaneta</option>' + '<option>Sahagún</option>' + '<option>Sampués</option>' + '<option>San Andrés</option>' + '<option>San Gil</option>' + '<option>San Jacinto</option>' + '<option>San José del Guaviare</option>' + '<option>San Juan del Cesar</option>' + '<option>San Juan de Nepomuceno</option>' + '<option>San Marcos</option>' + '<option>San Martín</option>' + '<option>San Onofre</option>' + '<option>San Pablo</option>' + '<option>Santa Marta</option>' + '<option>Santander de Quilichao</option>' + '<option>Santa Rosa de Cabal</option>' + '<option>Santo Tomás</option>' + '<option>San Vicente del Caguán</option>' + '<option>Saravena</option>' + '<option>Segovia</option>' + '<option>Sevilla</option>' + '<option>Sibaté</option>' + '<option>Sincé</option>' + '<option>Sincelejo</option>' + '<option>Soacha</option>' + '<option>Socorro</option>' + '<option>Sogamoso</option>' + '<option>Soledad</option>' + '<option>Tame</option>' + '<option>Tarazá</option>' + '<option>Tierralta</option>' + '<option>Tolú</option>' + '<option>Tumaco</option>' + '<option>Tunja</option>' + '<option>Turbaco</option>' + '<option>Turbo</option>' + '<option>Ubaté</option>' + '<option>Valledupar</option>' + '<option>Villa del Rosario</option>' + '<option>Villamaría</option>' + '<option>Villavicencio</option>' + '<option>Yarumal</option>' + '<option>Yopal</option>' + '<option>Yumbo</option>' + '<option>Zarzal</option>' + '<option>Zipaquirá</option>' + '</select>' + '<div class="custom dropdown">' + '<a href="#" class="current">Selecciona tu Ciudad</a>' + '<a href="#" class="selector"></a>' + '<ul>' + '<li>Selecciona tu Ciudad</li>' + '<li>Acacías</li>' + '<li>Aguachica</li>' + '<li>Aguazul</li>' + '<li>Agustín Codazzi</li>' + '<li>Andes</li>' + '<li>Anserma</li>' + '<li>Apartadó</li>' + '<li>Aracataca</li>' + '<li>Arauca</li>' + '<li>Ariguani</li>' + '<li>Aguachica</li>' + '<li>Arjona</li>' + '<li>Armenia</li>' + '<li>Ayapel</li>' + '<li>Baraona</li>' + '<li>Barbosa(ANT)</li>' + '<li>Barbosa(SAN)</li>' + '<li>Barrancabermeja</li>' + '<li>Barranquilla</li>' + '<li>Bello</li>' + '<li>Bogotá D.C.</li>' + '<li>Bosconia</li>' + '<li>Bucaramanga</li>' + '<li>Buga(Guadalajar de Buga)</li>' + '<li>Caicedonia</li>' + '<li>Cajicá</li>' + '<li>Calarcá</li>' + '<li>Caldas</li>' + '<li>Cali</li>' + '<li>Campoalegre</li>' + '<li>Candelaria</li>' + '<li>Carepa</li>' + '<li>Carmen de Viboral</li>' + '<li>Cartagena (de Indias)</li>' + '<li>Cartago</li>' + '<li>Caucasia</li>' + '<li>Cereté</li>' + '<li>Chaparral</li>' + '<li>Chía</li>' + '<li>Chigorodó</li>' + '<li>Chinchiná</li>' + '<li>Chinú</li>' + '<li>Chiquinquirá</li>' + '<li>Ciénaga</li>' + '<li>Ciénaga de Oro</li>' + '<li>Circasia</li>' + '<li>Copacabana</li>' + '<li>Corozal</li>' + '<li>Cúcuta</li>' + '<li>Dos Quebradas</li>' + '<li>Duitama</li>' + '<li>El Bagre</li>' + '<li>El Banco</li>' + '<li>El Carmen de Bolívar</li>' + '<li>El Cerrito</li>' + '<li>El Santuario</li>' + '<li>Envigado</li>' + '<li>Espinal</li>' + '<li>Facatativá</li>' + '<li>Flandes</li>' + '<li>Florencia</li>' + '<li>Florida</li>' + '<li>Floridablanca</li>' + '<li>Fonseca</li>' + '<li>Fundación</li>' + '<li>Funza</li>' + '<li>Fusagasugá</li>' + '<li>Galapa</li>' + '<li>Garzón</li>' + '<li>Girardot</li>' + '<li>Girardota</li>' + '<li>Girón</li>' + '<li>Granada</li>' + '<li>Honda</li>' + '<li>Ibagué</li>' + '<li>Ipiales</li>' + '<li>Itagüí</li>' + '<li>Jamundí</li>' + '<li>La Ceja</li>' + '<li>La Dorada</li>' + '<li>La Estrella</li>' + '<li>La Plata</li>' + '<li>La Tebaida</li>' + '<li>La Unión</li>' + '<li>La Virginia</li>' + '<li>Leticia</li>' + '<li>Líbano</li>' + '<li>Lorica</li>' + '<li>Los Patios</li>' + '<li>Madrid</li>' + '<li>Magangué</li>' + '<li>Maicao</li>' + '<li>Malambo</li>' + '<li>Manaure</li>' + '<li>Manizales</li>' + '<li>Marinilla</li>' + '<li>Mariquita</li>' + '<li>Medellín</li>' + '<li>Mariquita</li>' + '<li>Melgar</li>' + '<li>Miranda</li>' + '<li>Mitú</li>' + '<li>Mocoa</li>' + '<li>Mompós</li>' + '<li>Montelíbano</li>' + '<li>Montenegro</li>' + '<li>Montería</li>' + '<li>Mosquera</li>' + '<li>Neiva</li>' + '<li>Ocaña</li>' + '<li>Orito</li>' + '<li>Palmar de Varela</li>' + '<li>Palmira</li>' + '<li>Pamplona</li>' + '<li>Pasto</li>' + '<li>Pereira</li>' + '<li>Piedecuesta</li>' + '<li>Pitalito</li>' + '<li>Pivijay</li>' + '<li>Planeta Rica</li>' + '<li>Plato</li>' + '<li>Popayán</li>' + '<li>Pradera</li>' + '<li>Puerto Asís</li>' + '<li>Puerto Berrío</li>' + '<li>Puerto Boyacá</li>' + '<li>Puerto Carreño</li>' + '<li>Puerto Colombia</li>' + '<li>Puerto Inírida</li>' + '<li>Puerto López</li>' + '<li>Puerto Tejada</li>' + '<li>Quibdó</li>' + '<li>Quimbaya</li>' + '<li>Riohacha</li>' + '<li>Rionegro</li>' + '<li>Roldanillo</li>' + '<li>Sabanagrande</li>' + '<li>Sabaneta</li>' + '<li>Sahagún</li>' + '<li>Sampués</li>' + '<li>San Andrés</li>' + '<li>San Gil</li>' + '<li>San Jacinto</li>' + '<li>San José del Guaviare</li>' + '<li>San Juan del Cesar</li>' + '<li>San Juan de Nepomuceno</li>' + '<li>San Marcos</li>' + '<li>San Martín</li>' + '<li>San Onofre</li>' + '<li>San Pablo</li>' + '<li>Santa Marta</li>' + '<li>Santander de Quilichao</li>' + '<li>Santa Rosa de Cabal</li>' + '<li>Santo Tomás</li>' + '<li>San Vicente del Caguán</li>' + '<li>Saravena</li>' + '<li>Segovia</li>' + '<li>Sevilla</li>' + '<li>Sibaté</li>' + '<li>Sincé</li>' + '<li>Sincelejo</li>' + '<li>Soacha</li>' + '<li>Socorro</li>' + '<li>Sogamoso</li>' + '<li>Soledad</li>' + '<li>Tame</li>' + '<li>Tarazá</li>' + '<li>Tierralta</li>' + '<li>Tolú</li>' + '<li>Tumaco</li>' + '<li>Tunja</li>' + '<li>Turbaco</li>' + '<li>Turbo</li>' + '<li>Ubaté</li>' + '<li>Valledupar</li>' + '<li>Villa del Rosario</li>' + '<li>Villamaría</li>' + '<li>Villavicencio</li>' + '<li>Yarumal</li>' + '<li>Yopal</li>' + '<li>Yumbo</li>' + '<li>Zarzal</li>' + '<li>Zipaquirá</li>' + '</ul></div>');
                  }
                  return $('#dataInfoDetail').append('<label for="name">Nombre Completo</label>' + '<input id="name" type="text" name="name" placeholder="Nombres Apellidos">' + '<label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años" id="age">' + '<label>Genero</label>' + '<select id="genre" style="display: none;">' + '<option selected>Selecciona tu Genero</option>' + '<option>Femenino</option>' + '<option>Masculino</option>' + '</select>' + '<div class="custom dropdown">' + '<a href="#" class="current">Selecciona tu genero</a>' + '<a href="#" class="selector"></a>' + '<ul>' + '<li>Selecciona tu genero</li>' + '<li>Femenino</li>' + '<li>Masculino</li>' + '</ul></div></div>');
                });
                /*
                								$('#dataInfo').empty()
                											  .append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label>'+
                											  		  '<input id="name" type="text" name="name" placeholder="Nombres Apellidos">'+
                											  		  '<label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city">'+
                											  		  '<label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años" id="age">'+
                											  		  '<label>Genero</label><select id="genre" style="display: none;">'+
                											  		  '<option selected>Selecciona tu Genero</option>'+
                											  		  '<option>Femenino</option><option>Masculino</option></select>'+
                											  		  '<div class="custom dropdown"><a href="#" class="current">Selecciona tu genero</a>'+
                											  		  '<a href="#" class="selector"></a><ul><li>Selecciona tu genero</li>'+
                											  		  '<li>Femenino</li><li>Masculino</li></ul></div></div>')
                */

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
                $('#dataInfo').empty().append('<div id="dataInfoDetail"><label for="name">Nombre Completo</label>' + '<input id="name" type="text" name="name" placeholder="Nombres Apellidos">' + '<label for="city">Ciudad</label><input type="text" name="city" placeholder="Ciudad donde vives" id="city">' + '<label>Edad</label><input type="text" name="age" placeholder="Mayor de 18 años" id="age">' + '<label>Genero</label><select id="genre" style="display: none;">' + '<option selected>Selecciona tu Genero</option><option>Femenino</option>' + '<option>Masculino</option></select><div class="custom dropdown">' + '<a href="#" class="current">Selecciona tu genero</a><a href="#" class="selector"></a>' + '<ul><li>Selecciona tu genero</li><li>Femenino</li><li>Masculino</li></ul></div></div>');
                return progressBar(50, $('#progressBar'));
              } else {
                return $('#dataInfo').empty().append('<h3>Este código no existe, verifica tu correo electrónico</h3>');
              }
            });
          } else if ($('#profile').val() === 'Patrocinador' && $('#askAbout').val() !== 'Escoge una opción') {
            return $('#dataInfo').empty().append('<div id="dataInfoDetail"><label for="name">Nombre de la Empresa</label>' + '<input id="name" type="text" name="name" placeholder="Razon Social"><label for="city">Ciudad</label>' + '<input type="text" name="city" placeholder="Ciudad de contacto" id="city">' + '<label>NIT o Documento</label><input type="text" name="nit" placeholder="Sin puntos, ni comas">' + '<label>Telefono</label><input id="name" type="text" name="phoneNumber" placeholder="Digitos más indicativo"></div>');
          } else {
            return $('#dataInfo').empty().append('<div id="dataInfoDetail"><span>¡No seleccionaste alguna de las opciones ya casi consigues 200 Puntos!</span></div>');
          }
        } else if ($('li.stepy-active div').text() === 'Paso 2') {
          if ($('#profile').val() === 'Artista Visual' && $('#askAbout').val() !== 'Escoge una opción') {
            $('#dataValidation').empty().append('<div id="dataValidationDetail"><h5>Escoge las opciones que te interesan:</h5>' + '<label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;">' + '<span class="custom checkbox"></span> Crear perfil profesional</label>' + '<label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;">' + '<span class="custom checkbox"></span> Sincronizar portafolios creativos (devianArt y Behance)</label>' + '<label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;">' + '<span class="custom checkbox"></span> Compartir con mis redes sociales</label>' + '<label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;">' + '<span class="custom checkbox"></span> Manejar mi propiedad intelectual</label>' + '<label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;">' + '<span class="custom checkbox"></span> Mi mercadeo y comunicaciones</label>' + '<label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;">' + '<span class="custom checkbox"></span> Usar <em>toolkit</em> para manejar mi carrera creativa</label>' + '<label for="checkbox7"><input type="checkbox" id="checkbox7" style="display: none;">' + '<span class="custom checkbox"></span> Finanzas para creativos</label>' + '<label for="checkbox8"><input type="checkbox" id="checkbox8" style="display: none;">' + '<span class="custom checkbox"></span> Vender mis servicios y obras</label>' + '<label for="checkbox9"><input type="checkbox" id="checkbox9" style="display: none;">' + '<span class="custom checkbox"></span> Solicitar asesoría especializada</label>' + '<label for="checkbox10"><input type="checkbox" id="checkbox10" style="display: none;">' + '<span class="custom checkbox"></span> Acceso a cursos online</label>' + '<label for="checkbox11"><input type="checkbox" id="checkbox11" style="display: none;">' + '<span class="custom checkbox"></span> Aplicar a ofertas</label><label for="checkbox12">' + '<input type="checkbox" id="checkbox12" style="display: none;">' + '<span class="custom checkbox"></span> Ver concursos</label>' + '<br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small></div>');
            return progressBar(80, $('#progressBar'));
          } else if ($('#profile').val() === 'Fan o Seguidor' && $('#askAbout').val() !== 'Escoge una opción') {
            $('#dataValidation').empty().append('<div id="dataValidationDetail"><h5>Escoge las opciones que te interesan:</h5>' + '<label for="checkbox1"><input type="checkbox" id="checkbox1" style="display: none;">' + '<span class="custom checkbox"></span> Crear perfil y comenzar la experiencia</label>' + '<label for="checkbox2"><input type="checkbox" id="checkbox2" style="display: none;">' + '<span class="custom checkbox"></span> Crear mi <em>“play list”</em> de artistas digitales</label>' + '<label for="checkbox3"><input type="checkbox" id="checkbox3" style="display: none;">' + '<span class="custom checkbox"></span> Actividades para fans (concursos y juegos)</label>' + '<label for="checkbox4"><input type="checkbox" id="checkbox4" style="display: none;">' + '<span class="custom checkbox"></span> Votar por mi artista favorito</label>' + '<label for="checkbox5"><input type="checkbox" id="checkbox5" style="display: none;">' + '<span class="custom checkbox"></span> Ganar puntos</label>' + '<label for="checkbox6"><input type="checkbox" id="checkbox6" style="display: none;">' + '<span class="custom checkbox"></span> Ganar premios</label>' + '<br /><small>Al enviar esta información, Acepto los términos y condiciones de culttu.me</small></div>');
            return progressBar(80, $('#progressBar'));
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
        var age, check, city, country, data, selectOption, _i;

        data = {};
        data.services = [];
        data.profile = $('#profile').val();
        data.askAbout = $('#askAbout').val();
        data.name = $('#name').val();
        country = $('#country').find('option:selected');
        data.country = country.val();
        city = $('#city').find('option:selected');
        data.city = city.val();
        age = $('#age').find('option:selected');
        data.age = age.val();
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
          socket.on('congratulationDetail', function(congrat) {
            $('#congratulationDetail').append('<div class="ten centered columns">' + '<span>' + congrat.name + '</span><span class="subheader"> Bienvenido a culttu.me</span>' + '</div>' + '<div class="twelve columns">' + '<hr class="lineFooterCulttume"></div>' + '<p> Recuerda que te enviaremos información y novedades' + ' al correo electrónico:</p>' + '<div class="alert-box success">' + congrat.email + '</div><br />' + '<p>Adicional ganas <span class="radius label"> 200 Puntos</span> que podras canjear por premios' + 'y todas las cosas que más te gustan de tu artista favorito</p>' + '<div class="three columns centered">' + '<img src="./img/modal/cup.png" /></div>');
            progressBar(100, $('#progressBar'));
            return $('#congratulation').reveal();
          });
        } else {
          alert('revisa algunos datos estan mal');
        }
        return false;
      }
    });
  });

}).call(this);
