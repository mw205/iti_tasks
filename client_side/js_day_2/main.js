//Task 1.1:
let grades = [];
var gradesSum = 0;

// Task 1.1
// for (let i = 0; i < 3; i++) {
//   let grade = prompt("enter your grade : ");
//   // Task1.2
//   gradesSum += parseFloat(grade);
//   grades.push(grade);
// }
// console.log(grades);

// Task 1.2
// console.log("grades sum : ", gradesSum);

// Task 1.3
var studentNumber = 0;
// studentNumber = prompt("How many grades do you have ? ");
// for (let i = 0; i < studentNumber; i++) {
//   var grade = 0;
//   grade = prompt(`enter ${i + 1} grade : `);
//   gradesSum += parseFloat(grade);
//   grades.push(grade);
// }
// console.log(grades);
// console.log("grades sum : ", gradesSum);

// Task 1.4

// var flag = true;
// while (flag) {
//   studentNumber = prompt("How many grades do you have ? ");
//   if (studentNumber < 2 || studentNumber > 10) {
//     alert("Number of students must be between 2 and 10 ");
//   } else {
//     flag = false;
//     for (let i = 0; i < studentNumber; i++) {
//       var grade = 0;
//       grade = prompt(`enter ${i + 1} grade : `);
//       gradesSum += parseFloat(grade);
//       grades.push(grade);
//     }
//     console.log(grades);
//     console.log("grades sum : ", gradesSum);
//   }
// }

var flag = true;
while (flag) {
  studentNumber = prompt("How many grades do you have ? ");
  if (studentNumber < 2 || studentNumber > 10) {
    alert("Number of students must be between 2 and 10 ");
  } else {
    flag = false;
    for (let i = 0; i < studentNumber; i++) {
      var grade = 0;
      grade = prompt(`enter ${i + 1} grade : `);
      // validate that the entered grade is a number
      while (isNaN(grade) || grade < 0 || grade > 100) {
        grade = prompt(`enter ${i + 1} grade : `);
      }
      gradesSum += parseFloat(grade);
      grades.push(grade);
    }
    console.log(grades);
    console.log("grades sum : ", gradesSum);
  }
}
