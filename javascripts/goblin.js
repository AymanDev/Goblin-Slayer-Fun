function print(message) {
  console.log(message);
}

print('Kek');

//var - обычный тип переменной, позволяет записывать переменную и перезаписывать
// var player = '';
//const - тип перемнной, которая позволяет записывать переменную, но не перезаписывать
const player1 = '';
//let - тип перемнной, которая позволяет записывать и перезаписывать переменную
let player2 = '';

//Объект игрока
playerPreset = {
  name: '',
  x: 0,
  left: false
};

//Создаем объект на основе существующего(клонирование)
let player = Object.create(playerPreset);


//Стрелочная функция
$('#submit-login').click((event) => {
  let nickname = $('#username-field').val();

  if (nickname.length === 0) {
    alert('Укажите правильное имя!');
    event.preventDefault();
  }
});

//Обычная безымянная функция
$('#submit-login').click(function () {
  console.log('asdasd');
});