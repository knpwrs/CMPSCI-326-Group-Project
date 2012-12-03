define([
  'dust',
  'dustc!./User.dust',
  'dom/users'
], function (
  dust,
  template,
  $users
) {
  var UserView = function (data) {
    this.$el = $('<div>').addClass('user-container');
    dust.render(template, data, function (err, out) {
      this.$el.html(out);
      $users.append(this.$el);
    }.bind(this));
    this.$el.on('dragover', handleDragOver);
    this.$el.on('drop', handleFileSelect(data));
  };

  UserView.prototype.destroy = function () {
    this.$el.remove();
  };

  function handleDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = 'copy';
  }

  function handleFileSelect(data) {
    return function (e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.originalEvent.dataTransfer.files;
      for (var i = 0, len = files.length; i < len; i++) {
        var file = files[i];
        var reader = new FileReader();
        reader.onload = (function (file) {
          return function (e) {
            // data is in: e.target.result
            console.log('Dragged file onto %s', data.name);
            console.log(file.name);
            console.log(file.type);
          };
        })(file);
        reader.readAsBinaryString(file);
      }
    };
  }

  return UserView;
});