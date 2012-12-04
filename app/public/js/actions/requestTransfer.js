define(['socket'], function (socket) {
  return function (user, file, e) {
    var eventName = 'confirm-' + (new Date()).getTime();

    socket.emit('request-transfer', {
      user: user,
      file: {
        name: file.name,
        size: file.size
      },
      eventName: eventName
    });

    socket.once(eventName, function (accept) {
      if (!accept) {
        alert('Transfer rejected.');
        return;
      }
      var data = e.target.result;
      var len = data.length;
      var chunkSize = 512;
      var s = 1, c = Math.ceil(len / chunkSize);
      for (var i = 0; i < len; i += chunkSize) {
        var chunk = data.slice(i, i + chunkSize);
        socket.emit('transfer-chunk', {
          total: len,
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