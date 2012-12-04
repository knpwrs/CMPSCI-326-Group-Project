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
        return;
      }
      var data = e.target.result;
      var len = data.length;
      console.log('Start transfer of %s with event name %s.', file.name, eventName);
    });
  };
});