(function() {
  $(document).ready(function() {
    var socket;

    socket = io.connect('http://localhost');
    socket.on('connection', function(data) {
      return console.log(data);
    });
    $('#button').click(function() {
      console.log($('#email').val());
      return socket.emit('click', $('#email').val());
    });
    $('#button1').click(function() {
      return socket.emit('otherClick');
    });
    socket.on('returnList', function(list) {
      console.log(list);
      return $('#results').append('<h2>' + list.user.email);
    });
    socket.on('pulseCount', function() {
      console.log('email created');
      return $('#results').append('<h2>Gracias por tu registro</h2>');
    });
    return socket.on('disconnect', function() {
      return console.log('Disconnect');
    });
  });

}).call(this);
