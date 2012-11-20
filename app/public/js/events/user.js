define([
  './socket',
  'views/User'
], function (
  socket,
  UserView
) {
  // Store each user
  var users = {};

  // Handle new users
  socket.on('user-join', function (data) {
    users[data.id] = new UserView(data);
  });

  // Handle leaving users
  socket.on('user-leave', function (id) {
    users[id].destroy();
    delete users[id];
  });

  // Create new user
  socket.emit('user-join', {name: socket.socket.sessionid});
});