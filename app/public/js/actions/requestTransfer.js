define(['socket'], function (socket) {
  return function (user, file, e) {
    // data is in: e.target.result
    console.log('Requesting transfer of %s (%s) to %s.', file.name, file.type, user);
    console.log(e);
  };
});