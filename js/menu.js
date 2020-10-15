let currentButtons = [];
// Объявление и создание кнопок
let btnStart = $('.btnStart'),
  btnOptions = $('.btnOptions'),
  btnAbout = $('.btnAbout'),
  btnAboutClose = $('.btnAboutClose'),
  btnExit = $('.btnExit '),

  menu = {
    main: {
      start: $('<button></button>', {
        'text': 'Начать игру',
        'class': 'btnStart',
      }),
      options: $('<button></button>', {
        'text': 'Изменить настройки',
        'class': 'btnOptions',
        'data-new-menu': 'menu.optionsList'
      }),
      about: $('<button></button>', {
        'text': 'Справка',
        'class': 'btnAbout',
      }),
      exit: $('<button></button>', {
        'text': 'Выход',
        'class': 'btnExit',
      }),
    },

    optionsList: {
      speed: $('<button></button>', {
        'text': 'Изменить скорость змейки',
        'class': 'btnOptionsSpeed',
        'data-new-menu': 'menu.speed'
      }),
      specChance: $('<button></button>', {
        'text': 'Изменить шанс появления особой еды',
        'class': 'btnOptionsSpecChance',
        'data-new-menu': 'menu.specChance'
      }),
      back: $('<button></button>', {
        'text': 'Назад',
        'class': 'btnOptionsBack',
        'data-new-menu': 'menu.main'
      }),
    },

    speed: {
      speed1: $('<button></button>', {
        'text': 'Легко (x0.7)',
        'class': 'btnOptionsSpeedSpeed1',
        'data-new-menu': 'menu.optionsList',
        'data-option-speed': '200',
        'data-mod-speed': '0.7'
      }),
      speed2: $('<button></button>', {
        'text': 'Нормально (x1)',
        'class': 'btnOptionsSpeedSpeed2',
        'data-new-menu': 'menu.optionsList',
        'data-option-speed': '120',
        'data-mod-speed': '1'
      }),
      speed3: $('<button></button>', {
        'text': 'Сложно (x1.2)',
        'class': 'btnOptionsSpeedSpeed3',
        'data-new-menu': 'menu.optionsList',
        'data-option-speed': '70',
        'data-mod-speed': '1.2'
      }),
      speed4: $('<button></button>', {
        'text': 'Безумно (x1.5)',
        'class': 'btnOptionsSpeedSpeed4',
        'data-new-menu': 'menu.optionsList',
        'data-option-speed': '50',
        'data-mod-speed': '1.5'
      }),
      speedBack: $('<button></button>', {
        'text': 'Назад',
        'class': 'btnOptionsSpeedBack',
        'data-new-menu': 'menu.optionsList',
      }),
    },

    specChance: {
      chance1: $('<button></button>', {
        'text': 'Часто (x0.5)',
        'class': 'btnOptionsSpecChanceChance1',
        'data-new-menu': 'menu.optionsList',
        'data-option-specchance': '70',
        'data-mod-specchance': '0.5',
      }),
      chance2: $('<button></button>', {
        'text': 'Обычно (x1)',
        'class': 'btnOptionsSpecChanceChance2',
        'data-new-menu': 'menu.optionsList',
        'data-option-specchance': '120',
        'data-mod-specchance': '1',
      }),
      chance3: $('<button></button>', {
        'text': 'Редко (x1.35)',
        'class': 'btnOptionsSpecChanceChance2',
        'data-new-menu': 'menu.optionsList',
        'data-option-specchance': '160',
        'data-mod-specchance': '1.35',
      }),
      chance4: $('<button></button>', {
        'text': 'Отключить (x2)',
        'class': 'btnOptionsSpecChanceChance3',
        'data-new-menu': 'menu.optionsList',
        'data-option-specchance': '-1',
        'data-mod-specchance': '2',
      }),
      chanceBack: $('<button></button>', {
        'text': 'Назад',
        'class': 'btnOptionsSpecChanceBack',
        'data-new-menu': 'menu.optionsList',
      }),
    },
  };

for (key in menu) {
  for (select in menu[key]) {
    if (key == 'main') {
      menu[key][select].appendTo('.main-menu')
    } else {
      menu[key][select].appendTo('.main-menu').hide();
      menu[key][select].click(function () {
        createNewMenu($(this));
        checkData($(this));
      });
    };
  };
};

// Клик по кнопке "Начать игру"
$('.btnStart').click(function () {
  $('.main-menu').fadeOut(1000, () => $('canvas').fadeIn(500));

  // Запуск игры
  game = setInterval(drawGame, time);
  document.addEventListener("keydown", direction);
});
// Клик по кнопке "Справка"
$('.btnAbout').click(function () {
  $('.main-menu').fadeOut(300, () => {$('.about-block').fadeIn(300);
  $(btnAboutClose).fadeIn(300)});
});
btnAboutClose.click(function () {
  $('.about-block').fadeOut(300, () => $('.main-menu').fadeIn(300));
});
// Клик по кнопке "Выход"
$('.btnExit').click(function () {
  $('.main-menu').fadeOut(500, () => {var ww = window.open(window.location, '_self'); ww.close();});
});
menu.main.options.click(function () {
  createNewMenu($(this));
})

function createNewMenu(currentButton) {
  $('button').not('[style="display: none;"]').hide();
  if ($(currentButton.data('new-menu'))) {
    let newMenu = eval(currentButton.data('new-menu'));
    for (key in newMenu) {
      $(newMenu[key]).fadeIn(500);
    };
  }
};

function checkData(currentButton) {
  if ($(currentButton).data('option-speed')) {
    time = $(currentButton).data('option-speed');
    modificator.speed = $(currentButton).data('mod-speed');
  };
  if ($(currentButton).data('option-specchance')) {
    specChance = $(currentButton).data('option-specchance');
    modificator.specChance = $(currentButton).data('mod-specchance');
  };
};

