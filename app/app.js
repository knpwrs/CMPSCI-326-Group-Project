// Requirements
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    cons = require('consolidate'),
    io = require('socket.io');

// Constants
const PUBLIC_DIR = path.join(__dirname, 'public')

// Create express instance
var app = express();

// Configure Express
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.engine('dust', cons.dust);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(PUBLIC_DIR));
});

// Development configuration
app.configure('development', function() {
  app.use(express.errorHandler());
  app.use(require('./middleware/stylus')(PUBLIC_DIR));
});

// Production configuration
app.configure('production', function () {
  app.use(require('./middleware/stylus')(PUBLIC_DIR, true));
});

// Routes
app.get('/', routes.index);

// Start server
var server = http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

// Start and configure Socket.io
io = io.listen(server);
io.configure('production', function () {
  io.set('log level', 1);
});

// Set up Socket.io
io.sockets.on('connection', function (socket) {
  require('./events/user')(socket);
});