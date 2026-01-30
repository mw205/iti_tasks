const createStudentRow = function (student) {
  let trElm = document.createElement("tr");
  studentsTable.append(trElm);
  trElm.classList.add(`${student.department.toLowerCase()}BG`);

  for (let property in student) {
    let tdElem = document.createElement("td");
    tdElem.innerText = student[property];
    trElm.append(tdElem);
  }
  // adding delete button
  let tdElem = document.createElement("td");
  trElm.append(tdElem);
  let deleteBtnElem = document.createElement("button");
  deleteBtnElem.innerText = "Delete";
  tdElem.append(deleteBtnElem);

  //handle delete
  deleteBtnElem.onclick = function () {
    this.parentElement.parentElement.remove();
  };
  return trElm;
};

const isEmpty = function (value) {
  return value == "";
};

const isRepeated = function (arr, elementName) {
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element.name == elementName) {
      return true;
    }
  }
  return false;
};

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

const isGradeBetweenRange = function (grade) {
  return grade >= 0 && grade <= 100;
};
