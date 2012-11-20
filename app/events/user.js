// Requirements
var users = require('./store/users');

// User events
module.exports = function (socket) {
  // Handle joining users
  socket.on('user-join', function (data) {
    var allUsers = users.getAllUsers();
    for (var u in allUsers) {
      socket.emit('user-join', allUsers[u]);
    }
    users.addUser(socket, data);
    socket.broadcast.emit('user-join', data);
  });

  // Handle leaving users
  socket.on('disconnect', function () {
    users.removeUser(socket.id);
    socket.broadcast.emit('user-leave', socket.id);
  });
};