const canvas = document.querySelector("#canvas-main-game"),
  ctx = canvas.getContext("2d");

const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const foodSpecImg = new Image();
foodSpecImg.src = "img/food special.png"

const gameOverImg = new Image();
gameOverImg.src = "img/gameover.png"

let textGameOver = $('<p></p>'),
  spanGameOver = $('<span></span>', {
    'text': `Для начала новой игры нажмите на любую клавишу`,
    'class': 'span-game-over'
  });

let secondPlayer = false;

let box = canvas.width / 16,
  score = 0,
  record = 0,
  time = 120,
  specChance = 120,
  slideNumber = 0,
  slideCount = 0,
  game,
  dir,
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



function direction(event) {
  if (event.keyCode == 37 && dir != "right") {
    dir = "left";
  } else if (event.keyCode == 38 && dir != "down") {
    dir = "up";
  } else if (event.keyCode == 39 && dir != "left") {
    dir = "right";
  } else if (event.keyCode == 40 && dir != "up") {
    dir = "down";
  };
};

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

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      gameOver();
    };
  };
};

function gameOver() {
  textGameOver.text(`Вы проиграли. Ваш счет: ${Math.ceil(score * modificator.speed * modificator.specChance)}, коэффициент: ${modificator.speed * modificator.specChance}`);
  $('canvas').fadeOut(300, () => $('.main-menu').fadeIn(300));

  $('button').hide();
  $('.main-menu').append(textGameOver);
  $('.main-menu').append(spanGameOver);

  if (Math.ceil(score * modificator.speed * modificator.specChance) > record) {
    record = Math.ceil(score * modificator.speed * modificator.specChance);
  };
  setTimeout(() => document.addEventListener("keydown", newGame), 500);
};

function newGame() {
  ctx.drawImage(gameOverImg, 0, 0);
  score = 0;
  food.eaten = 0;
  food.specFlag = 0;
  slideNumber = 0;
  slideCount = 0;
  food.specY = undefined;
  food.specX = undefined;
  food.specFlag = 0;
  dir = '';
  snake = [];
  snake[0] = {
    x: 8 * box,
    y: 10 * box
  };
  food.x = Math.floor(Math.random() * 15) * box;
  food.y = Math.floor(Math.random() * 15 + 2) * box;

  textGameOver.detach();
  spanGameOver.detach();

  $('.main-menu').css('display', 'none');
  $('canvas').css('display', 'block');
  game = setInterval(drawGame, time);

  document.removeEventListener("keydown", newGame);
};

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


  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "white" : "red";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  };

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
    food.x = Math.floor(Math.random() * 15) * box;
    food.y = Math.floor(Math.random() * 15 + 2) * box;

    for (let i = 0; i < snake.length; i++) {
      if (food.x == snake[i].x && food.y == snake[i].y) {
        let foodError = 1;
        while (foodError = 1) {
          for (let i = 0; i < snake.length; i++) {
            if (food.x == snake[i].x && food.y == snake[i].y) {

            };
          };
        }
      };
    };





    if (food.x == food.specX || food.y == food.specY) {
      food.x = Math.floor(Math.random() * 15) * box;
      food.y = Math.floor(Math.random() * 15 + 2) * box;
    };
  } else {
    if (!foodFlag) {
      snake.pop();
    };
  };

  // Змейка врезалась в стену
  if (snakeX < 0 || snakeX > box * 15 || snakeY < box * 2 || snakeY > box * 17) {
    clearInterval(game);
    gameOver();
  };

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

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);

  if (food.eaten > 1 && (food.eaten % Math.round(Math.random() * specChance) == 0) && food.specFlag == 0 && specChance != -1) {
    ctx.drawImage(foodSpecImg, slideNumber * box, 0, 40, 40, food.specX, food.specY, 40, 40);
    food.specX = (Math.round(Math.random()) * 15) * box;
    food.specY = (Math.round(Math.random()) * 15 + 2) * box;
    food.specFlag = 1;
  };
};
