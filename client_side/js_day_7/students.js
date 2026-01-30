let addBtn = document.querySelector("input[value='Add']");
let studentNameField = document.querySelector("input[name='studentName']");
let gradeField = document.querySelector("input[name='studentGrade']");
let studentsTable = document.querySelector("#studentsData");
let nameErrorSpan = document.querySelector("#nameError");
let gradeErrorSpan = document.querySelector("#gardeError");
let filterSelection = document.querySelector("select[name='filter']");
let sortSelection = document.querySelector("select[name='sort']");
let students = [];

studentNameField.onblur = function () {
  if (isEmpty(this.value)) {
    nameErrorSpan.style.display = "inline";
    nameErrorSpan.innerText = "Field can't be empty";
  } else {
    nameErrorSpan.style.display = "none";
  }
};

gradeField.onblur = function () {
  if (isGradeBetweenRange(this.value) == false) {
    gradeErrorSpan.style.display = "inline";
    gradeErrorSpan.innerText = "grade should be between 0 and 100";
  } else {
    gradeErrorSpan.style.display = "none";
  }
};
filterSelection.onchange = function () {
  let filteredStudents = students;
  console.log(this.value);

  switch (this.value) {
    case "all":
      filteredStudents = students;
      break;
    case "success":
      filteredStudents = students.filter((student) => student.grade >= 60);
      break;
    default:
      filteredStudents = students.filter((student) => student.grade < 60);
      break;
  }
  studentsTable.innerHTML = "";
  for (const student of filteredStudents) {
    createStudentRow(student);
  }
};
sortSelection.onchange = function () {
  let filteredStudents = [];
  switch (this.value) {
    case "name":
      filteredStudents = students.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        if (a.name == b.name) return 0;
      });
      break;
    case "grade":
      filteredStudents = students.sort((a, b) => a.grade - b.grade);
      break;
    default:
      filteredStudents = students;
      break;
  }
  studentsTable.innerHTML = "";
  for (const student of filteredStudents) {
    createStudentRow(student);
  }
};

addBtn.onclick = function () {
  let departmentRadio = document.querySelector("input[type=radio]:checked");
  // validation
  let student = new Student(
    pascalCase(studentNameField.value),
    gradeField.value,
    departmentRadio.value
  ); //create spans to show errors
  console.log(student);

  let studentNameIsRepeated = isRepeated(students, studentNameField.value);

  if (studentNameIsRepeated) {
    nameErrorSpan.style.display = "inline";
    nameErrorSpan.innerText = "Name is repeated";
  }

  if (
    !isEmpty(studentNameField.value) &&
    !studentNameIsRepeated &&
    isGradeBetweenRange(gradeField.value)
  ) {
    students.push(student);
    createStudentRow(student);
  }
};
