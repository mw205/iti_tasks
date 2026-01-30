//1.a Find all images in page by two ways
// (document default collection and document methods).

// default collection

let images = document.images;
console.log(images);
console.log(document.querySelectorAll("img"));

//1.b Find all options for City drop down list.
console.log(document.querySelectorAll("select option"));

//1.c Find all rows for second table in page
console.log(document.querySelectorAll("table.bPink tr"));

//1.d Find all elements that contain class name fontBlue and BGrey.
console.log(document.querySelectorAll(".fontBlue .BGrey"));

//2.a Get first anchor inside the second table then change its’ href
//property to training.com and it’s text to “Training”
let aElement = document.querySelector(".bPink a");

aElement.href = "training.com";

aElement.innerText = "Training";

//2.b Find all images and change its borders to : solid pink 2px
for (let i = 0; i < images.length; i++) {
  const element = images[i];
  element.classList.add("borderedImages");
}

//2.c  Find all checkboxes (checked) in userData form and alert
// their values

let checkboxes = document.querySelectorAll("input[type=checkbox]");
for (let i = 0; i < checkboxes.length; i++) {
  const element = checkboxes[i];
  if (element.checked) {
    // alert(`${element.value}`);
  }
}

//2.d- Find element with id value “example” then change it’s
// background color to pink
let exampleEl = document.getElementById("example");
exampleEl.style.backgroundColor = "pink";

// 3 Display the date with time on the document title (which
// changed every second to show time with date).
// Note: use .toLocalString() method of the Date Object.

let intervalId = setInterval(() => {
  let date = new Date();
  document.title = date.toLocaleString();
}, 1000);

/*
4- write function startSliding(ImgObject) which takes the image
Object to be slide on the page , and start changing the image
every second to be professional :don’t make timer ID global return it from
sliding function.
then write another function that stop image sliding stopSliding(timerID)
which stop sliding the image.
Now call these functions on console to control image sliding on
the page
*/
const startSliding = (imgObject) => {
  let index = 0;
  let intervalId = setInterval(() => {
    imgObject.src = `images/${++index}.jpg`;
    if (index == 8) {
      index = 0;
    }
  }, 1000);
  return intervalId;
};

const stopSliding = (intervalId) => {
  clearInterval(intervalId);
};

let slidingInterval = startSliding(images[0]);

/*
 add a nice background image for full winodw
*/
const backgroundImageURI =
  "https://www.shutterstock.com/search/color-gradient-background";

const setBackgroundImage = (img) => {
  document.body.style.backgroundImage = `url(${img})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
};
setBackgroundImage(
  "https://media.istockphoto.com/id/963477640/vector/abstract-blurry-pastel-colored-background.jpg?s=612x612&w=0&k=20&c=naEpNUNwJkEKk7isulD3JtVrONYylH4SQBEJ_QhkYAQ="
);
