// global variables
const toMatch = new Date('2022-12-01T09:30:20');
let data = `date to match: ${toMatch}<br/>`;
document.getElementById('variables').innerHTML = data;

// method 1 using timestamp

const yourDate = toMatch.getTime(); //Get the timestamp
const today = Date.now();
// 2 days in millisecond
const day = 60 * 60 * 1000 * 24 * 2;
data = `
today: ${today}<br/>
yourDate: ${yourDate}<br/>
2 days in millisecond: ${day}<br/>
today - yourDate: ${today - yourDate}<br/>
is greater than 2 days: ${today - yourDate > day ? '<span class=green>true</span>' : '<span class=red>false</span>'}`;
document.getElementById('timestamp').innerHTML = data;

// method 2 using hours
const now = new Date();

const msBetweenDates = Math.abs(toMatch.getTime() - now.getTime());

// 👇️ convert ms to hours                  min  sec   ms
const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

data = `
hoursBetweenDates: ${hoursBetweenDates}<br/>
date is within 24 hours: ${
  hoursBetweenDates < 24 ? '<span class=green>true</span>' : '<span class=red>false</span>'
}<br/>
date is greater than 48 hours: ${
  hoursBetweenDates > 48 ? '<span class=green>true</span>' : '<span class=red>false</span>'
}<br/>
`;
document.getElementById('hours').innerHTML = data;

// unused
function _isOverEighteen(year = 0, month = 0, day = 0) {
  var now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
  var dob = year * 10000 + month * 100 + day * 1; // Coerces strings to integers

  return now - dob > 180000;
}
