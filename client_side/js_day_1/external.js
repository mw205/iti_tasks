// 3.a print the value of number1 on console before
// number1 definition line ?!
console.log(number1);
// var number1=3,number2=2.9,number3=0xff;
//
//3.d WHAT IF you remove var keyword from number1 definition
// and repeat the previous 3 steps , does the result change?
// yes, it changes when `let` used and the values are not printed anymore
// number1=3;

var number1 = 3,
  number2 = 2.9,
  number3 = 0xff;
var firstName = "Mohamed",
  middleName = "Waleed",
  lastName = `Abdelghany`;
var flag = true;
console.log("This is the External JavaScript file");

firstName[3] = "A";

console.log("first name : ", firstName);

// print all variables typeof

console.log("typeof number 1 = ", typeof number1);
console.log("typeof number 2 = ", typeof number2);
console.log("typeof number 3 = ", typeof number3);
console.log("typeof flag = ", typeof flag);
console.log("typeof first name = ", typeof firstName);
console.log("typeof middle name = ", typeof middleName);
console.log("typeof last name = ", typeof lastName);

function isEven(a) {
  return a % 2 == 0;
}
function printTo10() {
  for (let i = 0; i < 10; i++) {
    console.log(i);
  }
}
function checkSign(a) {
  if (a == 0) {
    console.log("zero");
  } else if (a > 0) {
    console.log("positive");
  } else {
    console.log("negative");
  }
}

function multiplicationTable(a) {
  for (let i = 1; i <= 12; i++) {
    console.log(`${a} * ${i} = ${a * i}`);
  }
}

function printDayName(a) {
  switch (a) {
    case 1:
      console.log("Saturday");
      break;
    case 2:
      console.log("Sunday");
      break;
    case 3:
      console.log("Monday");
      break;
    case 4:
      console.log("Tuesday");
      break;
    case 5:
      console.log("Wednesday");
      break;
    case 6:
      console.log("Thursday");
      break;
    case 7:
      console.log("Friday");
      break;
    default:
      console.log("invalid number");
      break;
  }
}
function isWeekend(a) {
  console.log(a == 1 || a == 7 ? "Weekend" : "Weekday");
}
