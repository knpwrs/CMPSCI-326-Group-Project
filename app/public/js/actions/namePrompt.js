// Defines a function which prompts a user for their name.
define(['stores/users'], function (users) {
  return function () {
    var name = prompt('Please enter your name','Harry Potter');
    return name;
  };
});