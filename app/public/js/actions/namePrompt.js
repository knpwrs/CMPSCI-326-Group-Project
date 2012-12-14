define(['stores/users'], function (users) {
  return function () {
  	//Creates the prompt for username, with a default text value set as "Harry Potter"
    var name = prompt('Please enter your name','Harry Potter');
    return name;
  };
});