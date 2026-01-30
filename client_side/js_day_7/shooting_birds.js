class Bird {
  constructor(id, size = 150) {
    this.id = id;
    this.size = size;
    this.el = document.createElement("img");
    this.el.src = "imgs/bird.gif";
    this.el.style.position = "absolute";
    this.el.style.width = this.size + "px";
    this.el.style.height = this.size + "px";

    this.left = Math.random() * (window.innerWidth - this.size);
    this.top = Math.random() * (window.innerHeight - this.size);
    this.el.style.left = this.left + "px";
    this.el.style.top = this.top + "px";

    this.stepX = Math.random() < 0.5 ? 20 : -20;
    this.stepY = Math.random() < 0.5 ? 20 : -20;
    this.moveInterval = null;
    this.alive = true;
  }

  start() {
    document.body.appendChild(this.el);
    this.moveInterval = setInterval(() => this.move(), 100);
  }

  move() {
    if (this.alive == false) return;
    this.left += this.stepX;
    this.top += this.stepY;

    if (this.left > window.innerWidth - this.size) {
      this.stepX = -Math.abs(this.stepX);
      this.left = window.innerWidth - this.size;
    }
    if (this.left < 0) {
      this.stepX = Math.abs(this.stepX);
      this.left = 0;
    }

    if (this.top > window.innerHeight - this.size) {
      this.stepY = -Math.abs(this.stepY);
      this.top = window.innerHeight - this.size;
    }
    if (this.top < 0) {
      this.stepY = Math.abs(this.stepY);
      this.top = 0;
    }

    this.el.style.left = this.left + "px";
    this.el.style.top = this.top + "px";
  }

  containsPoint(x, y) {
    let birdRight = this.left + this.size;
    let birdBottom = this.top + this.size;

    let isInsideX = x >= this.left && x <= birdRight;
    let isInsideY = y >= this.top && y <= birdBottom;

    return isInsideX && isInsideY;
  }

  die() {
    if (!this.alive) return;
    this.alive = false;

    this.el.src = "imgs/shot_bird.png";

    clearInterval(this.moveInterval);

    const fallInterval = setInterval(() => {
      this.top += 20;
      this.el.style.top = this.top + "px";

      if (this.top > window.innerHeight + this.size) {
        clearInterval(fallInterval);
        this.el.remove();
      }
    }, 30);
  }
}

class Game {
  constructor(totalBirds = 6, birdSize = 150) {
    this.totalBirds = totalBirds;
    this.birdSize = birdSize;
    this.birds = [];
    this.pointer = document.querySelector(".shooting_point");
    this.shootingOnClick();
  }

  shootingOnClick() {
    window.addEventListener("click", (e) => this.shoot(e.clientX, e.clientY));
  }

  start() {
    for (let i = 0; i < this.totalBirds; i++) {
      const bird = new Bird(i + 1, this.birdSize);
      this.birds.push(bird);
      bird.start();
    }
  }

  shoot(x, y) {
    // let soundAudio = document.querySelector("audio");
    // soundAudio.play();
    for (let i = this.birds.length - 1; i >= 0; i--) {
      const b = this.birds[i];
      if (b.alive && b.containsPoint(x, y)) {
        b.die();
        return;
      }
    }
  }
}

const game = new Game(6, 150);
game.start();

const cursorPointer = document.querySelector(".shooting_point");
cursorPointer.style.position = "absolute";
window.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;

  cursorPointer.style.left = x + "px";
  cursorPointer.style.top = y + "px";
});
