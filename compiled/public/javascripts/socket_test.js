(function() {
  $(document).ready(function() {
    var socket, toggle;

    socket = io.connect('http://localhost');
    toggle = function() {
      $('#disconected').toggleClass('hide');
      return $('#connected').toggleClass('hide');
    };
    socket.on('conected', function(data) {
      toggle();
      return console.log(data);
    });
    $('#button').click(function() {
      return socket.emit('click');
    });
    socket.on('pulseCount', function(clicks) {
      console.log('Clicks: ' + clicks);
      return $('#connected').append('<h2>Has pulsado ' + clicks + ' veces');
    });
    return socket.on('disconnect', function() {
      console.log('Disconnect');
      return toggle();
    });
  });

}).call(this);
