class Basket {
  constructor(size, bottom) {
    this.size = size;
    this.bottom = bottom;
    this.posX = Math.round((window.innerWidth - this.size) / 2);
    this.step = 10;

    this.el = document.createElement("img");
    this.el.src = "imgs/egg_basket.png";
    this.el.style.width = this.size + "px";
    this.el.style.height = this.size + "px";
    this.el.style.position = "absolute";
    this.el.style.bottom = this.bottom + "px";
    this.el.style.left = this.posX + "px";

    document.body.appendChild(this.el);

    this.enableMovement();
  }

  clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  enableMovement() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowRight":
          this.posX = this.clamp(
            this.posX + this.step,
            0,
            window.innerWidth - this.size
          );
          break;

        case "ArrowLeft":
          this.posX = this.clamp(
            this.posX - this.step,
            0,
            window.innerWidth - this.size
          );
          break;
      }
      this.el.style.left = this.posX + "px";
    });
  }

  getTop() {
    return window.innerHeight - this.size - this.bottom;
  }

  getRight() {
    return this.posX + this.size;
  }
}

class Egg {
  constructor(size, game) {
    this.size = size;
    this.game = game;

    this.el = document.createElement("img");
    this.el.src = "imgs/egg.png";
    this.el.style.height = this.size + "px";
    this.el.style.position = "absolute";

    this.left = Math.random() * (window.innerWidth - this.size);
    this.el.style.left = this.left + "px";

    this.posY = 20;
    this.el.style.top = this.posY + "px";

    document.body.appendChild(this.el);

    this.startFalling();
  }

  startFalling() {
    this.interval = setInterval(() => {
      this.posY += 20;
      this.el.style.top = this.posY + "px";

      this.checkCollision();
      this.checkCrash();
    }, 100);
  }

  checkCollision() {
    const eggBottom = this.posY + this.size;
    const eggRight = this.left + this.size;

    const basketTop = this.game.basket.getTop();
    const basketRight = this.game.basket.getRight();
    const basketLeft = this.game.basket.posX;

    if (eggBottom >= basketTop + 100) {
      const overlaps = this.left < basketRight && eggRight > basketLeft;

      if (overlaps) {
        this.game.increaseScore();
        this.destroy();
        this.game.spawnEgg();
      }
    }
  }

  checkCrash() {
    if (this.posY >= window.innerHeight - this.size) {
      this.el.src = "imgs/cracked_egg.png";
      clearInterval(this.interval);

      let gameOverIndicator = document.createElement("p");
      gameOverIndicator.style.fontSize = "100px";
      gameOverIndicator.style.textAlign = "center";
      gameOverIndicator.style.color = "red";
      gameOverIndicator.innerText = "Game over!!";
      document.body.appendChild(gameOverIndicator);
      setTimeout(() => {
        this.el.remove();
      }, 1200);
    }
  }

  destroy() {
    clearInterval(this.interval);
    this.el.remove();
  }
}

class Game {
  constructor() {
    this.score = 0;
    this.scoreEl = document.querySelector("p");
    this.updateScore();

    this.basket = new Basket(250, 20);
    this.spawnEgg();
  }

  updateScore() {
    this.scoreEl.innerText = `Score: ${this.score}`;
  }

  increaseScore() {
    this.score++;
    this.updateScore();
  }

  spawnEgg() {
    new Egg(150, this);
  }
}

new Game();
