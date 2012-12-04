// Requirements
var users = require('./store/users');

module.exports = function (socket) {
  socket.on('request-transfer', function (data) {
    var out = users.getSocket(data.user);

    data.from = socket.id;
    out.emit('request-transfer', data);
    out.once(data.eventName, function (accept) {
      socket.emit(data.eventName, accept);
    });
  });
};