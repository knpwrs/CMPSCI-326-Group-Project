define(['socket'], function (socket) {
  socket.on('request-transfer', function (data) {
    socket.emit(
      data.eventName,
      confirm('Accept ' + data.file.name + ' (' + data.file.size + ' bytes) from ' + data.from + '?')
    );
  });
});