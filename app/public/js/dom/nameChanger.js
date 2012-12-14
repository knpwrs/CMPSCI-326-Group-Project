// This module is a jQuery element containing the name changer button
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
	// Handle button clicks
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