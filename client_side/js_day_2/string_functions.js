// // task1
// function strlen(text) {
//   return text.lastIndexOf("");
// }
// // text = prompt("Enter a text to get its length: ");
// // console.log(strlen(text));

// // task2
// function toUpperCase(text) {
//  let output = "";
//   for (let i = 0; i < text.length; i++) {
//     const element = text[i];
//     output += element.toUpperCase();
//   }
//   return output;
// }
// console.log(toUpperCase("hello"));

// // task3
// function toLowerCase(text) {
//  let output = "";
//   for (let i = 0; i < text.length; i++) {
//     const element = text[i];
//     output += element.toLowerCase();
//   }
//   return output;
// }
// console.log(toLowerCase("HELLO"));

// // task4

// // let first = "",
// //   middle = "",
// //   last = "";
// // // let text = prompt("Enter a text : ");
// // first = text[0];
// // last = text[text.length - 1];
// // middle = text[Math.floor(text.length / 2) - 1];
// // console.log("first character : ", first);
// // console.log("last character : ", last);
// // console.log("middle character : ", middle);

// //task5

// // let firstName = prompt("enter your first name :");
// // let lastName = prompt("enter your last name :");
// // let greetingMessage = `Hello, ${firstName} ${lastName}!`;
// // console.log(greetingMessage);

// // task6
// // let fullName = prompt("enter your full name :");
// // console.log(fullName);
// // let fullNameFiltered = fullName.substring(0, fullName.length - 5);
// // console.log(fullNameFiltered);

// // task2.1
// let paragraph = "hello everyone";
// console.log(paragraph.includes("everyone") ? "exists" : "doesn't exist");

// // task2.2
// // let userName = "Mohamed";
// let greeting = "hello, user";

// console.log(greeting.replace("user", userName));

// task2.3
// function countChar(userName, char) {
//   let count = 0;
//   for (let i = 0; i < userName.length; i++) {
//     const element = userName[i];
//     console.log(element == char);
//     if (element == char) {
//       count++;
//     }
//   }
//   return count;
// }
// let charToCount = "a";
// let userName = "Mohamed Waleed";

// console.log(`${charToCount} counts : ${countChar(userName, charToCount)}`);

// task2.4

// let startSubStr = "id";
// let endSubStr = ".";
// let message = "id laboris non pariatur dolore non exercitation fugiat.";
// console.log(
//   `message starts with ${startSubStr}`,
//   message.startsWith(startSubStr)
// );
// console.log(`message ends with ${endSubStr}`, message.endsWith(endSubStr));

// task2.5
// let message = "Hello Mohamed";

// console.log(message.replaceAll(" ", ""));

//task3.1

// function extractDomain(email) {
//   return email.substring(email.lastIndexOf("@") + 1);
// }

// let email = "mw@gmail.com";

// console.log(extractDomain(email));

//task3.2
function initialsExtrator(text) {
  let output = `${text[0]}.${text.slice(
    text.lastIndexOf(" ") + 1,
    text.lastIndexOf(" ") + 2
  )}.`;
  return output;
}
let text = "John Smith";
console.log();

console.log(initialsExtrator(text));

// task 3.3

function reverseString(txt) {
  let output = "";
  for (let i = txt.length - 1; i >= 0; i--) {
    const element = txt[i];
    output += element;
  }
  return output;
}
console.log(reverseString("hello"));

function isPalindrome(txt) {
  return txt == reverseString(txt);
}

let txt = "level";
console.log(`${txt} is Palindrome? ${isPalindrome(txt)} `);

function isVowel(char) {
  return (
    char == "a" || char == "e" || char == "i" || char == "o" || char == "u"
  );
}

function countVowels(txt) {
  count = 0;
  for (let i = 0; i < txt.length; i++) {
    const element = txt[i];
    if (isVowel(element)) {
      count++;
    }
  }
  return count;
}
console.log(`vowels count in ${txt} : ${countVowels(txt)}`);

function titleCase(txt) {
  let output = "";
  for (let i = 0; i < txt.length; i++) {
    if (i == 0) {
      output += txt[i].toUpperCase();
    } else if (txt[i - 1] == " ") {
      output += txt[i].toUpperCase();
    } else {
      output += txt[i];
    }
  }
  return output;
}
console.log(titleCase("hello world"));

function maskingPhoneNumber(phoneNumber, masks) {
  return (
    phoneNumber.substring(0, masks).replaceAll(/[0-9]/g, "*") +
    phoneNumber.substring(masks)
  );
}

console.log(maskingPhoneNumber("01092219806", 6));

function whichLongest(txt1, txt2) {
  return strlen(txt1) > strlen(txt2) ? txt1 : txt2;
}
console.log(whichLongest("hello", "mohamed"));

function removeDuplicates(txt) {
  let output = "";
  for (let i = 0; i < txt.length; i++) {
    const element = txt[i];
    if (!output.includes(element)) {
      output += element;
    }
  }
  return output;
}
console.log(removeDuplicates("aabbcc"));
