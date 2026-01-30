for (let i = 1; i <= 6; i++) {
  const birdImg = document.createElement("img");
  //   birdImg.src = `images/birds/${i}.png`;
  birdImg.src = `images/bird.gif`;
  birdImg.width = 250;
  birdImg.height = 150;
  birdImg.style.position = "absolute";

  let left = Math.random() * (window.innerWidth - birdImg.width);
  let top = Math.random() * (window.innerHeight - birdImg.height);

  birdImg.style.left = left + "px";
  birdImg.style.top = top + "px";

  document.body.appendChild(birdImg);
  let step = Math.random() < 0.5 ? 20 : -20;

  setInterval(() => {
    // Move bird
    left += step;
    top += step;
    if (left > window.innerWidth - birdImg.width) {
      step = -step;
      left = window.innerWidth - birdImg.width;
    }
    if (top > window.innerHeight - birdImg.height) {
      step = -step;
      top = window.innerHeight - birdImg.height;
    }

    if (left < 0) {
      step = -step;
      left = 0;
    }

    if (top < 0) {
      step = -step;
      top = 0;
    }
    birdImg.style.left = left + "px";
    birdImg.style.top = top + "px";
  }, 100);
}
