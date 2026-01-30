const combineNamesAndAges = function (names, ages) {
  let obj = [];
  for (let i = 0; i < names.length; i++) {
    obj[i] = { name: names[i], age: ages[i] };
  }
  return obj;
};
let names = ["Sara", "Ali", "Mona"];
let ages = [20, 22, 19];
let objArray = combineNamesAndAges(names, ages);
console.log(objArray);

const countFrequency = function (arr) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    obj[element] = 0; // to remove nan
  }
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    obj[element]++;
  }
  return obj;
};
console.log(countFrequency(["a", "b", "a", "c", "b", "a"]));
const getGrade = function (degree) {
  if (degree <= 100 && degree >= 90) {
    return "A";
  } else if (degree < 90 && degree >= 80) {
    return "B";
  } else if (degree < 80 && degree >= 70) {
    return "C";
  } else if (degree < 70 && degree >= 60) {
    return "D";
  }
  return "F";
};

const groupGrades = function (degrees) {
  let gradesGroup = {
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
  };
  for (let i = 0; i < degrees.length; i++) {
    const grade = getGrade(degrees[i]);
    gradesGroup[grade].push(degrees[i]);
  }
  return gradesGroup;
};

console.log(groupGrades([95, 82, 60, 45, 77, 88]));
const pascalCase = function (txt) {
  let output = "";
  for (let i = 0; i < txt.length; i++) {
    if (i == 0) {
      output += txt[i].toUpperCase();
    } else if (txt[i - 1] == " ") {
      output += txt[i].toUpperCase();
    } else {
      output += txt[i].toLowerCase();
    }
  }
  return output;
};

const namesToPascal = function (students) {
  let result = [];
  for (let i = 0; i < students.length; i++) {
    const element = students[i];
    element.name = pascalCase(element.name);
    result.push(element);
  }
  return result;
};
console.log(
  namesToPascal([
    { name: "ahmed", grade: 90 },
    { name: "mona", grade: 80 },
  ])
);

// const sortByDegree
const sortByDegree = function (students) {
  let sortedStudents = students;
  sortedStudents.sort((a, b) => b.grade - a.grade);
  return sortedStudents;
};

console.log(
  sortByDegree([
    { name: "Ali", grade: 70 },
    { name: "Sara", grade: 95 },
  ])
);

const findHighestGrade = function (students) {
  let heighest = students[0];
  students.reduce((prev, current) => {
    heighest = prev > current.grade ? prev : current;
  });
  return heighest;
};
console.log(
  findHighestGrade([
    { name: "Ali", grade: 70 },
    { name: "Sara", grade: 95 },
  ])
);

const filterPassStudents = function (students) {
  let pass = students.filter((students) => students.grade >= 60);
  return pass;
};
console.log(
  filterPassStudents([
    { name: "Ali", grade: 55 },
    { name: "Sara", grade: 95 },
    { name: "Mona", grade: 62 },
  ])
);

const toArrayOfStrings = function (arrays) {
  let result = [];
  for (let i = 0; i < arrays.length; i++) {
    const element = arrays[i];
    let objectString = "";
    for (const key in element) {
      objectString += element[key];
    }
    result.push(objectString);
  }
  return result;
};
console.log(
  toArrayOfStrings([
    { name: "Ali", grade: 70 },
    { name: "Sara", grade: 95 },
  ])
);

const countStudentsWithNamesGreaterThan4 = function (students) {
  let count = 0;
  students.forEach((value) => {
    if (value.name.length >= 4) {
      count++;
    }
  });
  return count;
};
console.log(
  countStudentsWithNamesGreaterThan4([
    { name: "Ali" },
    { name: "Mona" },
    { name: "Zyad" },
  ])
);

const createBook = function (title, author, year, price) {
  let book = {
    title,
    author,
    year,
    price,
    isClassic() {
      return new Date().getFullYear() - year >= 20;
    },

    applyDiscount(percent) {
      this.price -= this.price * percent;
    },
    toString() {
      return ` title: '${title}', author: '${author}', year: ${year}, price: ${price}, `;
    },
  };
  return book;
};

let books = [
  createBook("book1", "Mohamed Waleed", 2025, 20),
  createBook("book2", "Mostafa", 2000, 25),
  createBook("book3", "Aly", 2018, 50),
  createBook("book4", "Adel", 2012, 125),
];

for (let i = 0; i < books.length; i++) {
  const element = books[i];
  console.log(element.title, "is classic ? ", element.isClassic());
}
for (let i = 0; i < books.length; i++) {
  const element = books[i];
  if (new Date().getFullYear() - element.year >= 10) {
    element.applyDiscount(0.1);
  }
}
for (let i = 0; i < books.length; i++) {
  const element = books[i];
  console.log(element.price);
}
