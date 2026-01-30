const colorPkr = document.querySelector("#color-picker");

const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const generateRandomCircle = () => {
  for (let i = 0; i < 100; i++) {
    drawCircle(colorPkr.value);
  }
};
const drawCircle = (color) => {
  const centerX = getRandomNumber(0, 500);
  const centerY = getRandomNumber(0, 500);
  const radius = getRandomNumber(10, 50);
  const startAngle = 0;
  const endAngle = 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.stroke();
};

const updateCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const newColor = colorPkr.value;
  generateRandomCircle(newColor);
};
colorPkr.addEventListener("input", updateCanvas);
