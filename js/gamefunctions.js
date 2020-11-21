// Изменение направления движения змейки
function direction(event) {
  console.log(event.path[0].id);
  if (timerCheck != timer) {
    timerCheck = timer;
    if ((event.keyCode == 37 || event.path[0].id == 'left-button') && dir != "right") {
      dir = "left";
    } else if ((event.keyCode == 38 || event.path[0].id == 'up-button') && dir != "down") {
      dir = "up";
    } else if ((event.keyCode == 39 || event.path[0].id == 'right-button') && dir != "left") {
      dir = "right";
    } else if ((event.keyCode == 40 || event.path[0].id == 'down-button') && dir != "up") {
      dir = "down";
    };
    nextDir = undefined;
  } else {
    directionFlag = 1;
    if (event.keyCode == 37 && dir != "right") {
      nextDir = "left";
    } else if (event.keyCode == 38 && dir != "down") {
      nextDir = "up";
    } else if (event.keyCode == 39 && dir != "left") {
      nextDir = "right";
    } else if (event.keyCode == 40 && dir != "up") {
      nextDir = "down";
    };
  };

  if (previousDir != dir) {
    let cornerNum;
    if (previousDir == "left") {
      if (dir == "up") {
        cornerNum = 0;
      } else {
        cornerNum = 80;
      };
    } else if (previousDir == "up") {
      if (dir == "left") {
        cornerNum = 80;
      } else {
        cornerNum = 40;
      };
    } else if (previousDir == "right") {
      if (dir == "up") {
        cornerNum = 120;
      } else {
        cornerNum = 80;
      };
    } else if (previousDir == "down") {
      if (dir == "left") {
        cornerNum = 120;
      } else {
        cornerNum = 80;
      };
    };

    // let newCorner = {
    //   x: snake[0].x,
    //   y: snake[0].y,
    //   cornerNum: cornerNum
    // }

    // cornerPos.unshift(newCorner);
  };
};

// Змейка врезалась в хвост
function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
      gameOver();
    };
  };
};

// Окончание игры
function gameOver() {
  textGameOver.text(`Вы проиграли. Ваш счет: ${Math.ceil(score * modificator.speed * modificator.specChance)}, коэффициент: ${modificator.speed * modificator.specChance}`);
  $('canvas').fadeOut(300, () => $('.main-menu').fadeIn(300));

  $('button').hide();
  $('.main-menu').append(textGameOver);
  $('.main-menu').append(spanGameOver);

  points = score + points;
  localStorage.setItem('points', points);

  if (Math.ceil(score * modificator.speed * modificator.specChance) > record) {
    record = Math.ceil(score * modificator.speed * modificator.specChance);
  };
  setTimeout(() => document.addEventListener("keydown", newGame), 500);
};

// Новая игра
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

// Отрисовка змейки
function drawSnake(arr, colorBody) {

  // if (dir != previousDir) {
  //   if (dir == "left") {
  //     headImgPos.x = 180;
  //     if (previousDir == "up") {
  //       headImgPos.y = 60;
  //     } else {
  //       headImgPos.y = 0;
  //     };
  //   } else if (dir == "up") {
  //     headImgPos.x = 0;
  //     if (previousDir == "right") {
  //       headImgPos.y = 60;
  //     } else {
  //       headImgPos.y = 0;
  //     };
  //   } else if (dir == "right") {
  //     headImgPos.x = 60;
  //     if (previousDir == "down") {
  //       headImgPos.y = 60;
  //     } else {
  //       headImgPos.y = 0;
  //     };
  //   } else if (dir == "down") {
  //     headImgPos.x = 120;
  //     if (previousDir == "left") {
  //       headImgPos.y = 60;
  //     } else {
  //       headImgPos.y = 0;
  //     };
  //   };
  // } else {
  //   headImgPos.y = 120;
  //   if (dir == "left") {
  //     headImgPos.x = 180;
  //   } else if (dir == "up") {
  //     headImgPos.x = 0;
  //   } else if (dir == "right") {
  //     headImgPos.x = 60;
  //   } else if (dir == "down") {
  //     headImgPos.x = 120;
  //   };
  // };

  for (let i = 0; i < arr.length; i++) {

    // for (let i2 = 0; i2 < cornerPos.length; i2++) {
    //   if (cornerPos[i2].x == arr[i].x && cornerPos[i2].y == arr[i].y) {
    //     console.log('1');
    //     ctx.fillStyle = colorBody;
    //   ctx.fillRect(cornerPos[i2].x, cornerPos[i2].y, box, box);
    //   };
    // }

    if (i == 0) {
      // switch (dir) {
      //   case "left":
      //     ctx.drawImage(headImg, headImgPos.x, headImgPos.y, 60, 40, arr[i].x - 20, arr[i].y, 60, 40);
      //     break;
      //   case "right":
      //     ctx.drawImage(headImg, headImgPos.x, headImgPos.y, 60, 40, arr[i].x, arr[i].y, 60, 40);
      //     break;
      //   case "up":
      //     ctx.drawImage(headImg, headImgPos.x, headImgPos.y, 40, 60, arr[i].x, arr[i].y - 20, 40, 60);
      //     break;
      //   case "down":
      //     ctx.drawImage(headImg, headImgPos.x, headImgPos.y, 40, 60, arr[i].x, arr[i].y, 40, 60);
      //     break;
      // };
      // } else if (arr.some(elem => {for (let i2 = 0; i2 < cornerPos.length; i2++) {
      //   if (cornerPos[i2].x == arr[i].x) {
      //     console.log('1')
      //   };
      // }
      // console.log('1');
      ctx.fillStyle = 'white';
      ctx.fillRect(arr[i].x, arr[i].y, box, box);

    } else {
      ctx.fillStyle = colorBody;
      ctx.fillRect(arr[i].x, arr[i].y, box, box);
    }
  };
};

// Создание новых координат еды
function randCoordFood() {
  food.x = Math.floor(Math.random() * 15) * box;
  food.y = Math.floor(Math.random() * 15 + 2) * box;
}

// Змейка врезалась в стену
function wallHit(x, y) {
  if (x < 0 || x > box * 15 || y < box * 2 || y > box * 17) {
    clearInterval(game);
    gameOver();
  };
};