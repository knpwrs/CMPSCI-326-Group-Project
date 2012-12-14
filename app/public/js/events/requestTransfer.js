// fs/tfs!20971520 creates a 20 MB temporary file system
define([
  'socket',
  'fs/tfs!20971520',
  'fs/fileErrorHandler',
  'stores/notifications',
  'views/Notification'
  ], function (
    socket, 
    fs, 
    fer,
    notifications,
    NotificationView
    ) {
  // Keep track of approved transfers
  var approvedTransfers = {};

  socket.on('request-transfer', function (data) {
    //creates a new Notification view and uses callbacks to get the subjects answer to request transfer
    notifications[data.eventName] = new NotificationView(data, function (accept) {
      if (accept) {
        approvedTransfers[data.eventName] = {
          data: '',
          name: data.file.name,
          type: data.file.type
        };
      }
      socket.emit(data.eventName, accept);
      if (!accept) {
        notifications[data.eventName].destroy();
      }
    });
  });

  socket.on('transfer-chunk', function (data) {
    var transfer = approvedTransfers[data.eventName];
    if (transfer === undefined) {
      return;
    }
    transfer.data += data.chunk;
    //Updates NotificationView to the % downloaded
    notifications[data.eventName].updateView(data.seq / data.totalChunks);
    if (data.seq === data.totalChunks) {
      console.log('Save file with event name %s.', data.eventName);
      fs.root.getFile(new Date().getTime() + '-' + transfer.name, {create: true, exclusive: true}, function (fe) {
        fe.createWriter(function (fw) {
          fw.onwriteend = function (e) {
            console.log('Write completed: %s', fe.toURL());
            //Updates NotificationView to show the download is complete
            notifications[data.eventName].completed(fe.toURL());
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