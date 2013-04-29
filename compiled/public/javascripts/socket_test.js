(function() {
  var socket;

  socket = io.connect('http://192.168.1.106:7576');

  socket.on('news', function(data) {
    console.log(data);
    return socket.emit('my other event', {
      my: 'data'
    });
  });

}).call(this);
