// Шаблон игрока
const playerPreset = {
  nickname: String,
  x: Number,
  left: false,
  speed: 10
};

// Объект игрока
let player = Object.create(playerPreset);

// Переменная паузы
let gamePaused = true;

// Событие вызываемо после загрузки всей страницы
$(document).ready(() => {
  // Это второй и новый способ задания безымянной функции
  $('#submit-login').click(() => {
    player.nickname = $('#username-field').val();

    if (player.nickname.length === 0) {
      alert('Никнейм слишком короткий');
      return;
    }

    // Закрываем панели
    $('#login-panel').toggle();
    $('#ranking-screen').toggle();

    //Меняем значение никнейма на странице
    $('#username').text(player.nickname);

    gamePaused = false;
  });

  // Обработчик событий нажатий клавиш
  $(document).keydown((key) => {
    console.log(key.which);

    if (gamePaused) {
      return;
    }

    // Лево
    if (key.which === 65) {
      player.left = true;
      player.x -= player.speed;
    }

    // Право
    if (key.which === 68) {
      player.left = false;
      player.x += player.speed;
    }

    $('#player').animate({left: player.x}, 10, 'linear');
  });
});