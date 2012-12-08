define(['stores/users'], function (users) {
  return function () {
    var name = prompt('Please enter your name','Harry Potter');
    return name;
  };
});