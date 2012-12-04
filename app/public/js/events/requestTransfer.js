define(['socket'], function (socket) {
  // Keep track of approved transfers
  var approvedTransfers = {};

  socket.on('request-transfer', function (data) {
    var accept = confirm('Accept ' + data.file.name + ' (' + data.file.size + ' bytes) from ' + data.from + '?');
    if (accept) {
      approvedTransfers[data.eventName] = '';
    }
    socket.emit(data.eventName, accept);
  });

  socket.on('transfer-chunk', function (data) {
    if (approvedTransfers[data.eventName] === undefined) {
      return;
    }
    approvedTransfers[data.eventName] += data.chunk;
    if (data.seq === data.totalChunks) {
      console.log('Save file with event name %s.', data.eventName);
    }
  });
});