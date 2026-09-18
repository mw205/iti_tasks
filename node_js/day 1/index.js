// Variables and Data Types
// let, const , and var  , -> we will use const and let always
// string, number, boolean, null, undefined -> primitive types
// object, array -> reference types

// console.log(x);

// let x = 5;
// if (true) {
//     const y = 10;
// }
// console.log(y);

// console.log(add(4, 5));
// // Functions
// // function declaration
// function add(x, y) {
//     return x + y;
// }
// console.log(add(4, 5));
// console.log(sub(4, 5));

// // function expression
// const sub = function (x, y) {
//     return x - y;
// }
// console.log(sub(4, 5));


// // arrow function , this keywords , does not point to it's caller
// const mul = (x, y) => x * y;


/**
 * Array Methods
 * map, filter, reduce, forEach, find,  some, every
 */

// const arr = ["apple", "bannana", "orange"];
// console.log(arr.map((el) => el.toUpperCase()));

// console.log(arr.filter((el, idx, arr) => el !== "apple"));
// const numbers = [1, 2, 3, 4, 5];

// const sum = numbers.reduce((acc, num) => acc + num, 0)
// console.log(sum);

/** Modern JS Features
 * Template literals
 * Destructing
 * Spread/Rest Operators
 */

// const name = "shady";

// const emailContent = `welcome on board ${name} we are happy to have you with us`;

// console.log(emailContent);

// const person = {
//     name: "shady",
//     age: 25,
//     city: "cairo",
//     job: "developer"
// }

// const arr = [1, 2, 3];

// const arr2 = [...arr, 4, 5, 6];

// console.log(arr2);

// const applicant = person.name;
// const { name: applicant, age, ...rest } = person;

// console.log(applicant, age, rest)


// shallow copy , deep copy

// const person = {
//     name: "shady",
//     age: 25,
//     city: "mansoura",
//     job: "developer"
// }

// const person2 = { ...person }; // shallow copy
// // deep copy  -> recursive function , or using JSON.parse(JSON.stringify(person))

// person2.city = "cairo";

// console.log(person);
// console.log(person2);


// higher order functions -> function accept functions as a param or return function
// const mulBy = function (multiplyer) {
//     return function (num) {
//         return multiplyer * num;
//     };
// };


// const mulBy3 = mulBy(3);
// const mulBy5 = mulBy(5);

// console.log(mulBy3(10));
// console.log(mulBy5(10));

// 01003896598