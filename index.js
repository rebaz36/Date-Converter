function Calender(date) {
  // Split the input date into year, month, and day
  const dateArray = date.split('-');
  const RecivedYear = parseInt(dateArray[0]);
  const RecivedMonth = parseInt(dateArray[1]);
  const RecivedDay = parseInt(dateArray[2]);
  const isLeapYear = CalculateLeapYear(RecivedYear);
  const kudate = gregorianToKurdish(
    RecivedDay,
    RecivedMonth,
    RecivedYear + 700,
    isLeapYear,
  );

  return kudate;
}

console.log(Calender('2021-03-20')); // Output: 2721-10-12
console.log(Calender('2021-03-21')); // Output: 2721-10-12
console.log(Calender('2021-03-22')); // Output: 2721-10-12
console.log(Calender('2021-03-23')); // Output: 2721-10-12

console.log(Calender('2022-03-20')); // Output: 2721-10-15
console.log(Calender('2022-03-21')); // Output: 2721-10-13
console.log(Calender('2022-03-22')); // Output: 2721-10-13
console.log(Calender('2022-03-23')); // Output: 2721-10-13

console.log(Calender('2023-03-20')); // Output: 2721-10-15
console.log(Calender('2023-03-21')); // Output: 2721-10-14
console.log(Calender('2023-03-22')); // Output: 2721-10-14
console.log(Calender('2023-03-23')); // Output: 2721-10-14

console.log(Calender('2024-03-20')); // Output: 2721-10-15
console.log(Calender('2024-03-21')); // Output: 2721-10-15
console.log(Calender('2024-03-22')); // Output: 2721-10-15
console.log(Calender('2024-03-23')); // Output: 2721-10-15

console.log(Calender('2025-03-20')); // Output: 2721-10-16
console.log(Calender('2025-03-21')); // Output: 2721-10-16
console.log(Calender('2025-03-22')); // Output: 2721-10-16
console.log(Calender('2025-03-23')); // Output: 2721-10-16

console.log(Calender('2026-03-20')); // Output: 2721-10-17
console.log(Calender('2026-03-21')); // Output: 2721-10-17
console.log(Calender('2026-03-22')); // Output: 2721-10-17
console.log(Calender('2026-03-23')); // Output: 2721-10-17

function gregorianToKurdish(RecivedDay, RecivedMonth, RecivedYear, isLeapYear) {
  let kurdishMonthDays = [
    31,
    31,
    31,
    31,
    31,
    31,
    30,
    30,
    30,
    30,
    30,
    isLeapYear ? 30 : 29,
  ];
  let KDay = RecivedDay;
  let KMonth = RecivedMonth;
  let KYear = RecivedYear;
  // Calculate the number of days to add to the given date
  let daysToSubstract = isLeapYear ? 79 : 80;
  // calculate if the given date is before or after 21 March substract one year
  // from the year if date is before 21st march or 20th march on leap year
  if (RecivedMonth < 3 || (RecivedMonth === 3 && RecivedDay < 21)) {
    KYear--;
  }
  // calculate the month substraction take two months from the given month
  // if the given date is before 21st march or 20th march on leap year
  if (RecivedMonth < 3 || (RecivedMonth === 3 && RecivedDay < 21)) {
    KMonth = 9 + RecivedMonth;
  } else {
    KMonth = RecivedMonth - 2;
  }

  if (KMonth < 7 && KMonth > 0) {
    daysToSubstract -= 62;
  } else if (KMonth >= 10) {
    daysToSubstract -= isLeapYear ? 61 : 60;
  } else {
    daysToSubstract -= 60;
  }
  // calculate the day substraction
  if (RecivedMonth === 3 && RecivedDay < 21) {
    KDay = 21 - RecivedDay;
    KDay = kurdishMonthDays[KMonth - 1] - KDay + 1;
  } else if (RecivedMonth === 3 && RecivedDay > 20) {
    KDay = RecivedDay - 20;
  } else if (RecivedMonth < 3) {
    KDay = kurdishMonthDays[KMonth - 1] - KDay;
  } else if (RecivedMonth > 3) {
    KDay = RecivedDay;
  }

  if (isLeapYear && KMonth === 12 && KDay >= 29) {
    KDay = 1;
    KMonth = 1;
    KYear++;
  } else if (isLeapYear && RecivedMonth >= 3 && RecivedDay > 20) {
    KDay++;
  }

  // Return the converted Kurdish date
  return `${KYear}-${KMonth}-${KDay}`;
}

function CalculateLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}
