// import moment from 'moment';
var moment = require('moment'); // require

var start = moment().utc().startOf('day').format();
console.log('start: ' + start, 'type: ' + typeof start)

// var end = moment.utc().endOf('day');
var today = moment().utc().startOf('day');

var end = today.utc().add(1, 'days').format();
console.log('end: ' + end)