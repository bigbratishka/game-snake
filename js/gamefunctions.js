function direction(event) {
  if (timerCheck != timer) {
    timerCheck = timer;
    if (event.keyCode == 37 && dir != "right") {
      dir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
      dir = "up";
    } else if (event.keyCode == 39 && dir != "left") {
      dir = "right";
    } else if (event.keyCode == 40 && dir != "up") {
      dir = "down";
    };
  }
};

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

function drawSnake(arr, colorHead, colorBody) {
  for (let i = 0; i < arr.length; i++) {
    ctx.fillStyle = i == 0 ? colorHead : colorBody;
    ctx.fillRect(arr[i].x, arr[i].y, box, box);
  };
};

function randCoordFood() {
  food.x = Math.floor(Math.random() * 15) * box;
  food.y = Math.floor(Math.random() * 15 + 2) * box;
}

function wallHit(x, y) {
  if (x < 0 || x > box * 15 || y < box * 2 || y > box * 17) {
    clearInterval(game);
    gameOver();
  };
};