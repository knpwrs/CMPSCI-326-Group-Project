// Constants
const OK = 200;
const ERROR = 500;
const ONE_YEAR = 365 * 24 * 60 * 60;
const HEADERS = {'content-type': 'text/css'};

// Dependencies
var stylus = require('stylus'),
    url = require('url'),
    fs = require('fs'),
    path = require('path');

// Cache compiled stylsheets
var cache = {};

// Returns connect middleware
module.exports = function (src, memoize) {
  return function (req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    var pathname = url.parse(req.url).pathname;

    if (memoize && cache[pathname]) {
      res.writeHead(OK, HEADERS);
      if (req.method === 'GET') {
        res.end(cache[pathname]);
      } else {
        res.end();
      }
    } else if (/\.css$/.test(pathname)) {
      var stylusPath = path.join(src, pathname.replace('.css', '.styl'));
      fs.readFile(stylusPath, 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          next();
        } else if (req.method === 'HEAD') {
          res.writeHead(OK, HEADERS);
          res.end();
        } else {
          stylus.render(data, {filename: stylusPath, compress: true}, function (err, css) {
            if (err) {
              console.log(err);
              res.writeHead(ERROR, HEADERS);
              res.end(err);
            } else {
              // Remove newlines
              css = css.replace(/\n/g, '');
              // Remove inline comments
              css = css.replace(/\/\*.+\*\//g, '');
              if (memoize) {
                console.log('Caching CSS for %s.', stylusPath);
                cache[pathname] = css;
                HEADERS['cache-control'] = 'public, max-age=' + ONE_YEAR;
              }
              res.writeHead(OK, HEADERS);
              res.end(css);
            }
          });
        }
      });
    } else {
      next();
    }
  };
};