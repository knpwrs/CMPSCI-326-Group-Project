require.config({
  paths: {
    'dust': 'lib/dust',
    'dustc': 'lib/dustc'
  }
})

require([
  'dom/users',
  'events/user',
  'lib/domReady!'
], function (
  $users
) {
  // Remove Loading Indicator
  $('#loading').remove();

  // Display Users Container
  $users.show();
});