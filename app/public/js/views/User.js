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
  };

  UserView.prototype.destroy = function () {
    this.$el.remove();
  };

  return UserView;
});