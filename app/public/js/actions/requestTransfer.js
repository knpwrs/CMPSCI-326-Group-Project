// Defines a function which will create a request to transfer a file.
define(['socket'], function (socket) {
  return function (user, file, e) {
    // Make a name for the transfer event
    var eventName = 'confirm-' + (new Date()).getTime();

    // Emit on the request-transfer channel
    socket.emit('request-transfer', {
      user: user,
      file: {
        name: file.name,
        type: file.type,
        size: file.size
      },
      eventName: eventName
    });

    // Handle the response to the transfer request
    socket.once(eventName, function (accept) {
      if (!accept) {
        alert('Transfer rejected.');
        return;
      }
      var data = e.target.result;
      var len = data.length;
      var chunkSize = 512;
      var s = 1, c = Math.ceil(len / chunkSize);
      // Start firing off chunks of the file.
      for (var i = 0; i < len; i += chunkSize) {
        var chunk = data.slice(i, i + chunkSize);
        socket.emit('transfer-chunk', {
          chunk: chunk,
          seq: s++,
          totalChunks: c,
          user: user,
          eventName: eventName
        });
      }
    });
  };
});