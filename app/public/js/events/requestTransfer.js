// fs/tfs!20971520 creates a 20 MB temporary file system
define(['socket', 'fs/tfs!20971520', 'fs/fileErrorHandler'], function (socket, fs, fer) {
  // Keep track of approved transfers
  var approvedTransfers = {};

  socket.on('request-transfer', function (data) {
    var accept = confirm('Accept ' + data.file.name + ' (' + data.file.size + ' bytes) from ' + data.from + '?');
    if (accept) {
      approvedTransfers[data.eventName] = {
        data: '',
        name: data.file.name,
        type: data.file.type
      };
    }
    socket.emit(data.eventName, accept);
  });

  socket.on('transfer-chunk', function (data) {
    var transfer = approvedTransfers[data.eventName];
    if (transfer === undefined) {
      return;
    }
    transfer.data += data.chunk;
    if (data.seq === data.totalChunks) {
      console.log('Save file with event name %s.', data.eventName);
      fs.root.getFile(new Date().getTime() + '-' + transfer.name, {create: true, exclusive: true}, function (fe) {
        fe.createWriter(function (fw) {
          fw.onwriteend = function (e) {
            console.log('Write completed: %s', fe.toURL());
          };
          fw.onerror = function (e) {
            console.log('Write failed: %s', e.toString());
          };
          var byteString = transfer.data;
          var ab = new ArrayBuffer(byteString.length);
          var ia = new Uint8Array(ab);
          for (var i = 0, len = byteString.length; i < len; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          var blob = new Blob([ia], {type: transfer.type});
          fw.write(blob);
        }, fer);
      }, fer);
    }
  });
});