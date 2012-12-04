// Store users
var users = {};

// Store sockets separately from users for serialization purposes
var sockets = {};

// Add user
exports.addUser = function (socket, data) {
  users[socket.id] = data;
  users[socket.id].id = socket.id;
  sockets[socket.id] = socket;
};

// Remove user
exports.removeUser = function (id) {
  delete users[id];
  delete sockets[id];
};

// Get user
exports.getUser = function (id) {
  return users[id];
};

exports.getSocket = function (id) {
  return sockets[id];
};

// Get all users
exports.getAllUsers = function () {
  return users;
};