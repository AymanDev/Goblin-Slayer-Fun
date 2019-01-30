// Шаблон игрока
const playerPreset = {
  nickname: String,
  x: 20,
  speed: 10,
  isMoving: false,
  left: false,
  div: 0
};
// Переменная паузы
let gamePaused = true;

// Когда страница загрузится полностью
$(document).ready(() => {
  // Создаем переменную игрока на основе шаблона
  let player = Object.create(playerPreset);
  player.div = $('#player');

  // Обрабатываем отжатие кнопки
  $(document).keyup((key) => {
    if (gamePaused) {
      return;
    }
    // Обработчик switch-case
    switch (key.which) {
      case 65: {
        player.isMoving = false;
        break;
      }

      case 68: {
        player.isMoving = false;
        break;
      }
    }

    //Анимация движения
    if (!player.isMoving) {
      player.div.removeClass('player-moving');
    }
  });

  // Обрабатываем нажатие кнопок
  $(document).keydown((key) => {
    if (gamePaused) {
      return;
    }

    // Обработчик switch-case
    switch (key.which) {
      case 65: {
        player.x -= player.speed;
        player.isMoving = true;
        // Поворачиваем рыцаря налево
        player.left = true;
        break;
      }

      case 68: {
        player.x += player.speed;
        player.isMoving = true;
        // Поворачиваем рыцаря направо
        player.left = false;
        break;
      }

      default: {
        player.isMoving = false;
        break;
      }
    }

    // Поворот персонажа
    if (player.left) {
      // Добавляем класс к нашему элементу
      player.div.addClass('left-direction');
      // Если персонаж повернут направо и на нем
      // уже висит класс left-direction
    } else if (player.div.hasClass('left-direction')) {
      // То удаляем класс left-direction
      player.div.removeClass('left-direction');
    }

    //Анимация движения
    if (player.isMoving) {
      player.div.addClass('player-moving');
    } else if (player.div.hasClass('player-moving')) {
      player.div.removeClass('player-moving');
    }

    //  Анимация движения
    player.div.stop().animate({left: player.x}, 10, 'linear');
  });

  $('#submit-login').click(() => {
    const username = $('#username-field').val();
    // Длина строки больше 0, то скрываем
    if (username.length > 0) {
      $('#login-panel').toggle();
      $('#ranking-screen').toggle();

      // Присваиваем имя пользователя и заменяем его на странице
      player.nickname = username;
      $('#username').text(username);
      gamePaused = false;
      return;
    }

    alert('Длина ника должна быть длиннее 0');
  });
});
