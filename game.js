// Game loop - Initialize, draw, update

let height = 20;
let width = 20;
let canvas = document.getElementById("snakeGameCanvas");
let pen = canvas.getContext("2d");
let canvasHeight = canvas.height;
let canvasWidth = canvas.width;
let snake;
let food;
let gameOver = false;
let phase;
let score = 2;

function init() {
    
  food = createFood();
  snake = {
    initialLength: 5,
    color: "yellow",
    direction: "right",
    cells: [],
    createSnake: () => {
      console.log("Inside createSnake");
      for (let i = snake.initialLength - 1; i >= 0; i--) {
        snake.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: () => {
      for (let i = 0; i < snake.cells.length; i++) {
        pen.fillStyle = snake.color;
        pen.fillRect(snake.cells[i].x * 10, snake.cells[i].y * 10, 10, 10);
        pen.strokeStyle = "black";
        pen.lineWidth = 2;
        pen.strokeRect(snake.cells[i].x * 10, snake.cells[i].y * 10, 10, 10);
      }
    },

    updateSnake: () => {
      let headX = snake.cells[0].x;
      let headY = snake.cells[0].y;
      let updatedX, updatedY;
      if (headX === food.x && headY === food.y) {
        food = createFood();
        score++;
        $(".intro").text("Your Score is " + score);
      } else snake.cells.pop();

      let dir = snake.direction;
      if (dir === "left") {
        updatedX = headX - 1;
        updatedY = headY;
      } else if (dir === "right") {
        updatedX = headX + 1;
        updatedY = headY;
      } else if (dir === "up") {
        updatedX = headX;
        updatedY = headY - 1;
      } else {
        updatedX = headX;
        updatedY = headY + 1;
      }
      snake.cells.unshift({ x: updatedX, y: updatedY });

      let lastX = Math.round(canvasWidth / 10);
      let lastY = Math.round(canvasHeight / 10);

      if (
        updatedX >= lastX ||
        updatedX < 0 ||
        updatedY >= lastY ||
        updatedY < 0 ||
        (headX === snake.cells[snake.cells.length - 1].x &&
          headY === snake.cells[snake.cells.length - 1].y)
      ) {
        $(".score").text("Your Score is " + score);
        openModal();
        gameOver = true;
      }
    },
  };
  snake.createSnake();
  console.log("Snake created");
}

function openModal() {
  $("#myModal").modal("show");
}

function createFood() {
  let randomCoordinateX = Math.round((Math.random() * (canvasWidth - 10)) / 10);
  let randomCoordinateY = Math.round(
    (Math.random() * (canvasHeight - 10)) / 10
  );

  colors = ["red", "green", "aqua", "coral", "orchid", "pink"];
  let randomColor = Math.round(Math.random() * colors.length);

  food = {
    x: randomCoordinateX,
    y: randomCoordinateY,
    color: colors[randomColor],
  };
  return food;
}

function getDirection(event) {
  console.log("Key Pressed");
  let keyPressed = event.key;
  if (keyPressed === "ArrowUp") snake.direction = "up";
  else if (keyPressed === "ArrowDown") snake.direction = "down";
  else if (keyPressed === "ArrowLeft") snake.direction = "left";
  else snake.direction = "right";
}

function draw() {
  pen.clearRect(0, 0, canvasWidth, canvasHeight);
  snake.drawSnake();
  console.log("Inside draw");
  console.log(food.color);
  pen.fillStyle = food.color;
  pen.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function update() {
  snake.updateSnake();
  console.log("Inside update");
}

function gameLoop() {
  draw();
  update();
  console.log(snake.direction);
  if (gameOver === true) {
    clearInterval(phase);
    $(document).ready(
      $(".close-btn").click(function () {
        window.close();
      })
    );
  }
}

function getLevel(){
    let level = $(".level-select-val").val();
    console.log("Level is : " + level);
    if(level === "easy")
      phase = setInterval(gameLoop, 370);
    else if(level === "medium")
      phase = setInterval(gameLoop, 160);
    else
      phase = setInterval(gameLoop,80);
  
 }

init();

gameLoop();

document.addEventListener("keydown", getDirection);

 
  document.getElementById("startBtn").addEventListener('click',function(){
    $(".intro").text("Your Score is "+ score);
  })


$(document).ready(
  $(".replay-btn").click(function () {
    $("#myModal").hide();
    location.reload();
  })
);

$(document).ready(
  $(".start-btn").click(getLevel));

