// Months
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

// Index route
exports.index = function(req, res){
  var date = new Date();
  var context = {
    title: 'CloudDrop',
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    month: months[date.getMonth()],
    date: date.getDate(),
    year: date.getFullYear()
  };
  res.render('index', context);
};