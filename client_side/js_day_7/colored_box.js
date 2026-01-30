let divList = document.querySelectorAll("div");

function cloneOnClick(e) {
  const clone = this.cloneNode();
  clone.addEventListener("click", cloneOnClick, { once: true });
  document.body.appendChild(clone);
}

divList.forEach((div) => {
  div.addEventListener("click", cloneOnClick, { once: true });
});
