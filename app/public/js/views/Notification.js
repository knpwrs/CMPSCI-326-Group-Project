define([
  'dust',
  'dustc!./Notification.dust',
  'dom/notifications',
  'actions/requestTransfer',
  'lib/domReady!'
], function (
  dust,
  template,
  $notifications,
  requestTransfer
) {
  var NotificationView = function (data, accept) {
    this.fileName = data.file.name;
    this.$el = $('<div>').addClass('notification-container');
    dust.render(template, data, function (err, out) {
      this.$el.html(out);
      $notifications.append(this.$el);
    }.bind(this));
    $('button.yes', this.$el).on('click', function (e) {
      e.preventDefault();
      handleClick(this.$el);
      accept(true);
    }.bind(this));
    $('button.no', this.$el).on('click', function (e) {
      e.preventDefault();
      handleClick(this.$el);
      accept(false);
    }.bind(this));
  };

  function handleClick($el) {
    $el.empty();
    var $box = $('<div>').addClass('box');
    var $bar = $('<div>').attr('width', '0%').addClass('bar');
    var $text = $('<div>').addClass('bar-text');
    $bar.append($text);
    $box.append($bar);
    $el.append($box);
  }

  NotificationView.prototype.updateView = function (data) {
    $('.bar-text', this.$el).text((data * 100).toFixed(0) + '%');
    $('.bar', this.$el).attr('style', 'width: ' + (data * 100).toFixed(0)+ '%');
  }

  NotificationView.prototype.completed = function (data){
    //this.$el.empty();
    var $p = $('<p>').text('Download complete ');
    var $link = $('<a>').attr({href: data, download: this.fileName}).text(this.fileName);
    this.$el.append($p);
    this.$el.append($link);
  }

  NotificationView.prototype.destroy = function () {
    this.$el.remove();
  };

  return NotificationView;
});