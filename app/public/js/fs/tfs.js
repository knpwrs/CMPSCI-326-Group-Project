// Loader plugin which provides a temporary file system
// tfs!20971520 creates a 20MB temporary file system
define(['./fileErrorHandler'], function () {
  return {
    load: function (name, req, load, config) {
      var size = parseInt(name.split('!').pop());
      window.webkitRequestFileSystem(window.TEMPORARY, size, function (fs) {
        load(fs);
      });
    }
  };
});