require({
  paths: {
    'dust': 'lib/dust',
    'dustc': 'lib/dustc'
  }
}, [
  'dom/header',
  'dom/users',
  'dom/notifications',
  'events/user',
  'events/requestTransfer',
  'lib/domReady!'
], function (
  $header,
  $users,
  $notifications
) {
  // Remove Loading Indicator
  $('#loading').remove();

  // Display all hidden elements
  $('.hide').show();
});