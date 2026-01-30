// const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const pascalCase = function (txt) {
//   let output = "";
//   for (let i = 0; i < txt.length; i++) {
//     if (i == 0) {
//       output += txt[i].toUpperCase();
//     } else if (txt[i - 1] == " ") {
//       output += txt[i].toUpperCase();
//     } else {
//       output += txt[i].toLowerCase();
//     }
//   }
//   return output;
// };
// const insertStudent = function () {
//   let firstName = pascalCase(prompt(`enter student's first name`));
//   let lastName = pascalCase(prompt(`enter student's last name`));
//   let age = parseInt(prompt(`enter student's age`));
//   while (isNaN(age) || age < 18 || age > 60) {
//     age = parseInt(prompt(`enter valid age for student`));
//   }
//   let email;
//   email = prompt(`enter student's email`);
//   while (!emailRegex.test(email)) {
//     if (emailRegex.test(email) == false) {
//       email = prompt(`enter a valid email for student  `);
//     }
//   }
//   let department = prompt(`enter student's department`);

//   let student = {
//     fullName: { firstName, lastName },
//     age,
//     email,
//     department,
//     toString() {
//       return `Student : ${this.fullName.firstName} ${this.fullName.lastName}`;
//     },
//   };

//   return student;
// };
let students = [];
for (let i = 0; i < 2; i++) {
  let student = {
    fullName: {
      firstName: "Mohamed"+i,
      lastName: "Waleed",
    },
    age: 22,
    department: "os",
  };
  students.push(student);
}

console.log(students);
let oldestStudent;
const oldestStudentFullName = function () {
  students.reduce(
    (prev, current) => (oldestStudent = current.age > prev.age ? current : prev)
  );
  console.log(
    `oldest student's full name is : ${oldestStudent.fullName.firstName} ${oldestStudent.fullName.lastName}`
  );
};

const findStudentsAgesAbove20 = function () {
  let studentsAbove20 = students.filter((student) => student.age > 20);
  console.log(studentsAbove20);
};

const getAverageAge = function () {
  let sum = students.reduce((prev, current) => prev + current.age, 0);
  return sum / students.length;
};

const sortStudentsByName = function () {
  students.sort((a, b) => {
    if (a.fullName.firstName === b.fullName.firstName) {
      if (a.fullName.lastName > b.fullName.lastName) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.fullName.firstName < b.fullName.firstName) {
      return -1;
    } else {
      return 1;
    }
  });
};

let arr = [];
const generateArrayOfFullNameAndAge = function () {
  arr = students.map((student) => {
    return {
      fullName: student.fullName,
      age: student.age,
    };
  });
};
