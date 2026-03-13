
function isLeapYear(year) {
  if (typeof year !== 'number' || !Number.isInteger(year)) {
    throw new TypeError('Year must be an integer.');
  }
  if (year % 4 !== 0) {
    return false;
  }
  if (year % 100 !== 0) {
    return true;
  }
  return year % 400 === 0;
}

console.log(isLeapYear(2020)); // true
console.log(isLeapYear(1900)); // false
console.log(isLeapYear(2000)); // true