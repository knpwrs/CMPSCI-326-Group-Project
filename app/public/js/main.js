require({
  paths: {
    'dust': 'lib/dust',
    'dustc': 'lib/dustc'
  }
}, [
  'dom/header',
  'dom/users',
  'dom/notifications',
  'dom/nameChanger',
  'events/user',
  'events/requestTransfer',
  'lib/domReady!'
], function () {
  // Remove Loading Indicator
  $('#loading').remove();

  // Display all hidden elements
  $('.hide').show();
});