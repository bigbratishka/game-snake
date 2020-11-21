const canvas = document.querySelector("#canvas-main-game"),
  ctx = canvas.getContext("2d");

const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const foodSpecImg = new Image();
foodSpecImg.src = "img/food special.png";

const headImg = new Image();
headImg.src = "img/head.png";

const bodyCornerImg = new Image();
bodyCornerImg.src = "img/body-corner.png";

const gameOverImg = new Image();
gameOverImg.src = "img/gameover.png";

let textGameOver = $('<p></p>', {
  'class': 'text-game-over'
}),
  spanGameOver = $('<span></span>', {
    'text': 'Для начала новой игры нажмите на любую клавишу',
    'class': 'span-game-over'
  });

if (!localStorage.getItem('points')) {
  localStorage.setItem('points', '0');
};

let box = canvas.width / 16,
  score = 0,
  record = 0,
  points = +localStorage.getItem('points'),
  time = 120,
  specChance = 120,
  slideNumber = 0,
  slideCount = 0,
  timer = 0,
  directionFlag = 0,
  headNum = 0,
  timerCheck,
  game,
  dir,
  previousDir,
  nextDir,
  food = {
    x: Math.floor(Math.random() * 15) * box,
    y: Math.floor(Math.random() * 15 + 2) * box,
    specX: undefined,
    specY: undefined,
    specFlag: 0,
    eaten: 0
  },
  modificator = {
    speed: 1,
    specChance: 1,
  },
  snake = [];

snake[0] = {
  x: 8 * box,
  y: 9 * box
};

headImgPos = {
  x: 0,
  y: 0,
};

cornerPos = [];

cornerPos[0] = {
  x: undefined,
  y: undefined,
  cornerX: undefined,
  cornerY: undefined
}

cornerPosInd = 0;


// function direction2(event) {
//   if (event.keyCode == 65 && dir != "right") {
//     dir2 = "left";
//   } else if (event.keyCode == 87 && dir != "down") {
//     dir2 = "up";
//   } else if (event.keyCode == 68 && dir != "left") {
//     dir2 = "right";
//   } else if (event.keyCode == 83 && dir != "up") {
//     dir2 = "down";
//   };
// };

function drawGame() {
  ctx.drawImage(groundImg, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  if (food.specFlag == 1) {
    slideCount++;
    if (slideCount % 4 == 0) {
      slideNumber++;
    };

    if (slideNumber == 8) {
      food.specFlag = 0;
      slideNumber = 0;
      slideCount = 0;
      food.specX = undefined;
      food.specY = undefined;
    };

  };

  ctx.drawImage(foodSpecImg, slideNumber * box, 0, 40, 40, food.specX, food.specY, 40, 40);

  drawSnake(snake, 'red')

  ctx.fillStyle = "white";
  ctx.font = "60px Architects Daughter, Times, serif";
  ctx.fillText(score, 100, 55);

  ctx.fillStyle = "white";
  ctx.font = "25px Architects Daughter, Times, serif";
  ctx.fillText('record: ' + record, 300, 35);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  let foodFlag = false;

  // Змейка ест особую еду
  if (snakeX == food.specX && snakeY == food.specY) {
    score += 5;
    food.eaten++;
    food.specX = undefined;
    food.specY = undefined;
    foodFlag = true;
  } else {
    if (foodFlag) {
      snake.pop();
    };
  };

  // Змейка ест еду
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food.eaten++;
    randCoordFood();

    while (snake.some(elem => elem.x == food.x) && snake.some(elem => elem.y == food.y)) {
      randCoordFood()
    }

    if (food.x == food.specX || food.y == food.specY) {
      randCoordFood();
    };
  } else {
    if (!foodFlag) {
      snake.pop();
    };
  };

  // Змейка врезалась в стену
  wallHit(snakeX, snakeY);

  // Перемещение змейки
  switch (dir) {
    case "left":
      snakeX -= box;
      break;
    case "right":
      snakeX += box;
      break;
    case "up":
      snakeY -= box;
      break;
    case "down":
      snakeY += box;
      break;
  };

  if (directionFlag == 1) {
    dir = nextDir;
    directionFlag = 0;
  };

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);

  if (food.eaten > 5 && (food.eaten % Math.round(Math.random() * specChance) == 0) && food.specFlag == 0 && specChance != -1) {
    ctx.drawImage(foodSpecImg, slideNumber * box, 0, 40, 40, food.specX, food.specY, 40, 40);
    food.specX = (Math.round(Math.random()) * 15) * box;
    food.specY = (Math.round(Math.random()) * 15 + 2) * box;
    food.specFlag = 1;
  };
  timer++;
  
  previousDir = dir;
};