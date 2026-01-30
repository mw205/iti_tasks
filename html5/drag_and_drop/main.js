const toDrag = document.getElementById("to-drag");
const rightGridContainer = document.getElementById("right-grid-container");
// const placeholderWrapper = document.getElementById("placeholder-wrapper");
let dragCard = document.getElementById("to-drag-card");
const draggableButtons = document.querySelectorAll(".btn");
draggableButtons.forEach((button) => {
  console.log("Draggable button found:", button.textContent.trim());
});

draggableButtons.forEach((btn) => {
  btn.addEventListener("dragstart", (e) => {
    console.log(e.target.id);

    e.dataTransfer.setData("draggableButton", e.target.id);
  });
});
toDrag.addEventListener("dragstart", (e) => {
  e.preventDefault();
});

toDrag.addEventListener("dragend", (e) => {
  e.preventDefault();
});

toDrag.addEventListener("drop", (e) => {
  e.preventDefault();
  if (dragCard) {
    dragCard.remove();
  }
  //   if (placeholderWrapper) {
  //     placeholderWrapper.remove();
  //   }
  let element = document.getElementById(
    e.dataTransfer.getData("draggableButton")
  );
  element.closest(".col-6").remove();
  let wrapper = document.createElement("div");
  wrapper.classList.add("col-6");

  wrapper.appendChild(element);
  element.classList.add("p-3");
  rightGridContainer.appendChild(wrapper);
});
rightGridContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});
