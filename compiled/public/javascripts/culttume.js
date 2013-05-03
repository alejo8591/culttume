(function() {
  $(document).ready(function() {
    var socket;

    socket = io.connect('http://localhost');
    socket.on('connection', function(data) {
      return console.log(data);
    });
    $('#registerEmail').validate({
      rules: {
        email: {
          email: true,
          required: true
        }
      },
      messages: {
        email: "ingresa un email valido"
      }
    });
    $('#registerEmail').removeAttr('novalidate');
    $('#register').on('click', function(event) {
      var email;

      email = $('#email').val();
      if (email !== "" && email !== undefined) {
        $('#enterEmail').removeClass('error');
        $('#errorEmail').remove();
        $('#email').removeClass('error');
        return socket.emit('registerEmail', $('#email').val());
      } else {
        $('#enterEmail').addClass('error');
        $('#email').addClass('error');
        return $('#enterEmail').append('<small class="error" id="errorEmail">Correo invalido</small>');
      }
    });
    $('#consult').click(function() {
      return socket.emit('otherClick');
    });
    socket.on('returnList', function(list) {
      console.log(list);
      return $('#results').append('<h2>' + list.user.email);
    });
    socket.on('fillData', function(data) {
      console.log('email created');
      console.log(data);
      return $('#results').append('<h3>Gracias ' + data.email + ' por tu registro</h3>');
    });
    socket.on('disconnect', function() {
      return console.log('Disconnect');
    });
    return $('#profile').on("change", function(event) {
      var profile;

      $('#dataInfoDetail').remove();
      $('legend').remove();
      profile = $(this).val();
      if (profile === 'Artista Visual') {
        $('fieldset').append('<legend>Perfil de Artista Visual</legend>');
        return $('#dataInfo').append('<div id="dataInfoDetail"><h4>Artista Visual</h4></div>');
      } else if (profile === 'Fan') {
        $('fieldset').append('<legend>Perfil de Fan</legend>');
        return $('#dataInfo').append('<div id="dataInfoDetail"><h4>Fan</h4></div>');
      } else if (profile === 'Patrocinador') {
        $('fieldset').append('<legend>Perfil de Patrocinador</legend>');
        return $('#dataInfo').append('<div id="dataInfoDetail"><h4>Patrocinador</h4></div>');
      } else {
        $('fieldset').append('<legend>No seleccionaste Perfil</legend>');
        return $('#dataInfo').append('<div id="dataInfoDetail"><span>¡No seleccionaste opción valida!</span></div>');
      }
    });
  });

}).call(this);
