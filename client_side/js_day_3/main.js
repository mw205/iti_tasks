//Task 1
// let arr = [1, 2, 3, 2, 7, 4, 4, 5];
// with set
// let arrWithoutDuplicates = new Set(arr);
// console.log(arrWithoutDuplicates);

// without sets
// let arrWithoutDuplicates = arr.filter((value, index, self) => {
//   return self.indexOf(value) === index; // false will remove the number , true will add it to arrWithoutDuplicates
// });

// console.log(arrWithoutDuplicates);

// Task2

// let fruits = ["apple", "banana", "mango"];
// let fruitsReversed = [];
// fruits.forEach((value) => {
//   fruitsReversed.push(value.split("").reverse().join(""));
// });

// console.log(fruitsReversed);

// Task3
// let numbers = [1, 2, 3, 4, 5, 6];

// let evensMultipliedBy2 = [...numbers];
// evensMultipliedBy2 = evensMultipliedBy2
//   .filter((value) => value % 2 == 0)
//   .map((value) => value * 2);

// console.log(evensMultipliedBy2);

// Task4 (get the second max)

// let numbers = [10, 30, 50, 20, 40];

// let max = Math.max(...numbers);
// let secondLargest = -Infinity;
// for (let i = 0; i < numbers.length; i++) {
//   if (numbers[i] > secondLargest && numbers[i] !== max) {
//     secondLargest = numbers[i];
//   }
// }
// console.log(secondLargest);
//Task 5

// let chars = ["a", "b", "c", "d", "e"];
// let evens = [];
// let odds = [];
// chars.forEach((value, index) => {
//   if (index % 2) {
//     odds.push(value);
//   } else {
//     evens.push(value);
//   }
// });
// console.log("odds : ", odds);
// console.log("evens : ", evens);

// Task 6

// let numbers = [20, 60, 51, 75, 33, 99];
// let count = 0;
// for (const number of numbers) {
//   if (number > 50) {
//     count++;
//   }
// }
// console.log(count);

// Task7
// let strings = ["hi", "international", "cat", "sun"];
// let largest = strings[0];
// for (const element of strings) {
//   if (element.length > largest.length) {
//     largest = element;
//   }
// }
// console.log(largest);

// task8
// let length = 5,
//   min = 10,
//   max = 50;
// let randomNumbers = [length];
// for (let i = 0; i < length; i++) {
//   let random = Math.random() * (max - min) + min;
//   randomNumbers[i] = parseInt(random);
// }
// console.log(randomNumbers);

// Task 9
// let arr = [1.2, 3.7, 4.5];
// arr = arr.map((value) => {
//   return Math.round(value);
// });
// console.log(arr);

// Task10
// const millisecondsPerDay = 1000 * 60 * 60 * 24;
// let dates = ["2024-01-01", "2024-03-01", "2024-04-15"];
// let days = dates.map((value) => {
//   let valueDate = new Date(value);
//   let differenceMilliseconds = Date.now() - valueDate;

//   return parseInt(differenceMilliseconds / millisecondsPerDay);
// });
// console.log(days);

// Task11
let dates = ["2024-05-01", "2024-01-01", "2024-03-15"];

dates.sort((a, b) => new Date(a) - new Date(b));

console.log(dates);
