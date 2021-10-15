// import moment from 'moment';
var moment = require('moment'); // require

var now = moment().utc().format(); //
console.log('now: ' + now)

var start = moment().utc().startOf('day').format();
console.log('start: ' + start, 'type: ' + typeof start)

// var end = moment.utc().endOf('day');
var today = moment().utc().startOf('day');

var end = today.utc().add(3, 'days');
console.log('end: ' + end)

const week = end.isoWeekday();
console.log('week: ' + week, 'type: ' + typeof week)

const dayOfWeek = 4;
const thursday = moment().isoWeekday(dayOfWeek).utc().startOf('day');
const nextThursday = thursday.add(1, 'weeks').format();
console.log('thursday: ' + thursday);
console.log('nextThursday: ' + nextThursday);

const getStakingDay = () => {
  const dayOfWeek = 4; // Thursday
  const todayNum = moment().utc().isoWeekday();
  const thursday = moment().isoWeekday(dayOfWeek).utc().startOf('day');

  if (todayNum >= dayOfWeek) {
    return thursday.add(1, 'weeks').toDate()
  }
  return thursday.toDate()
}

const stakingDay = getStakingDay();
console.log('stakingDay: ' + stakingDay)