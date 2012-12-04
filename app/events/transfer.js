// Requirements
var users = require('./store/users');

// Keep track of approved transfers
var approvedTransfers = {};

module.exports = function (socket) {
  socket.on('request-transfer', function (data) {
    var out = users.getSocket(data.user);
    data.from = socket.id;

    out.emit('request-transfer', data);
    out.once(data.eventName, function (accept) {
      if (accept) {
        approvedTransfers[data.eventName] = 0;
      }
      socket.emit(data.eventName, accept);
    });
  });

  socket.on('transfer-chunk', function (data) {
    var out = users.getSocket(data.user);
    data.from = socket.id

    if (approvedTransfers[data.eventName] !== undefined) {
      out.emit('transfer-chunk', data);
      approvedTransfers[data.eventName] += data.chunk.length;
      if (approvedTransfers[data.eventName] === data.total) {
        delete approvedTransfers[data.eventName];
      }
    }
  });
};