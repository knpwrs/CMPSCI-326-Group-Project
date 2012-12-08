define([
	'actions/namePrompt',
	'socket',
	'stores/users',
	'lib/domReady!'
], function (
	namePrompt,
	socket,
	users
) {
	var $button = $('#nameChanger');
	$button.on('click', function (e) {
		e.preventDefault();
		var name = namePrompt();
		var id = socket.socket.sessionid;
		if (name !== null){
			socket.emit('change-name', {name: name, id: id});
		}
	});
	return $button;
});