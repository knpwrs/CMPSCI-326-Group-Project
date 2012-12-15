// User events
define([
  'socket',
  'views/User',
  'stores/users',
  'actions/namePrompt'
], function (
  socket,
  UserView,
  users,
  namePrompt
) {
  // Handle new users
  socket.on('user-join', function (data) {
    users[data.id] = new UserView(data);
  });

  // Handle leaving users
  socket.on('user-leave', function (id) {
    users[id].destroy();
    delete users[id];
  });

  // Handle name change request
  socket.on('change-name', function (data) {
    users[data.id].changeName(data.name);
  });

  // Broadcast that a new user has joined.
  socket.emit('user-join', {name: socket.socket.sessionid, username: namePrompt()});

});