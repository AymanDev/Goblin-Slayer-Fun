
$(document).ready(()=>{
  let nickname;
  let time = 0;
  let score;
  const timerObj = $('.timer');
  const players = [
    {id: 1, username:'Player1', score: 100, time: '1:03'},
    {id: 2, username:'Player2', score: 50, time: '0:30'}
  ];
  let timeTickerTask;


  $('#submit-login').click(()=>{
    timeTickerTask = setInterval(timeTicker, 1000);

    $('#login-panel').toggle();
    $('#ranking-screen').toggle();
    setDisplayName();
    gamePaused = false;
  });

  $('#start-again').click(()=>{
    clearInterval(timeTickerTask);
  });

  function timeTicker() {
    time++;
    timerObj.text(`Time: ${time}`);
  }

  let tbody = '';
  players.sort((a, b)=>{
    return b.score - a.score;
  });
  for(let i  = 0; i < 2; i++){
    const id = players[i].id;
    const name = players[i].username;
    const score = players[i].score;
    const time = players[i].time;

    const appending = `<tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${score}</td>
        <td>${time}</td>
    </tr>`;

    tbody += appending;
  }
  $('#leaderboard-values').html(tbody);

  $.post('register.php', {
    username: nickname,
    time: time,
    score: score
  }, (data, status) => {
    //Do some things
  });

  //Game
  let gamePaused = true;
  //Movement
  let xPos = 0;
  const backgroundSpeed = 10;
  let moving = false;
  let leftDirection = false;
  const player = $('#player');
  let playerHealth = 100;
  let playerLeft = 0;
  const playerSpeed = 10;
  let playerAttack1 = false;

  const gameField = $('#game-field');

  const background = $('#background');
  let backgroundLeft = 4779;

setInterval(()=>{
  $('.elf').each((index)=>{
    const elf = $(this);
    let elfLeft = 200;
    const elfSpeed = 5;
    let elfMoving = false;
    let elfLeftDirection = false;
    let elfAttackCooldown = false;
    let elfAttack = false;

    setInterval(updateElf, 100);
    function updateElf(){
      if(gamePaused) return;
      if(collision(player)){
        if(!elfAttackCooldown){
          //damagePlayer(25);
          elfAttack = true;
        }
        elfAttackCooldown = true;

        setTimeout(()=>{
          elfAttackCooldown = false;
          elfAttack = false;
        }, 1000);
      }

      if(elfLeft > Math.abs(background.offset().left) + playerLeft + 50){
        elfLeft -= elfSpeed;
        elfMoving = true;
        elfLeftDirection = false;
      } else if(elfLeft < Math.abs(background.offset().left) + playerLeft) {
        elfLeft += elfSpeed;
        elfMoving = true;
        elfLeftDirection = true;
      } else {
        elfMoving = false;
      }


      if(elfMoving){
        elf.addClass('elf-moving');
        elf.removeClass('elf-idle');
      } else {
        elf.addClass('elf-idle');
        elf.removeClass('elf-moving');
      }
      if(elfLeftDirection){
        elf.addClass('left-direction');
      } else {
        elf.removeClass('left-direction');
      }
      if(elfAttack){
        elf.addClass('elf-attack');
      } else {
        elf.removeClass('elf-attack');
      }

      elf.stop();
      elf.animate({left: background.offset().left + elfLeft}, 100, 'linear');
    }
  });
}, 100);



  $(document).keydown((e)=>{
    if(gamePaused) return;

    if(e.which == 68){
      leftDirection = false;
      moving = true;

      if(playerLeft > window.innerWidth / 2 && backgroundLeft > -3300){
        backgroundLeft -= backgroundSpeed;
      }
      playerLeft += playerSpeed;
    }

    if(e.which == 65){
      leftDirection = true;
      moving = true;

      if(backgroundLeft < 4779){
        backgroundLeft += backgroundSpeed;
      }
      if(playerLeft > -50){
        playerLeft -= playerSpeed;
      }
    }

    if(e.which == 49){
      playerAttack1 = true;
      setTimeout(()=>{
        playerAttack1 = false;
      },1000);
      const enemy = collision(player);
      if(enemy){
        setTimeout(()=>{
          enemy.hide();
        },600);
      }
    }

    background.stop();
    player.stop();
    background.animate({left: backgroundLeft}, 100, 'linear');
    player.animate({left: playerLeft}, 100, 'linear');
  });

  $(document).keyup((e)=>{
    if(gamePaused) return;
    switch (e.keyCode) {
      case 68: {
        moving = false;
      }break;
      case 65: {
        moving = false;
      }break;
    }
    player.stop();
    background.stop();
  });


  function damagePlayer(amount){
    if(gamePaused) return;
    if(health <= 0){
      return;
    }
    playerHealth -= amount;
    $('#health-text').text(playerHealth);
    $('#health').stop().animate({width: (200 * playerHealth / 100)}, 10, 'linear');
  }

  setInterval(updateHPPlayer, 1000);
  function updateHPPlayer() {
    if(gamePaused) return;
    if(playerHealth < 100){
      playerHealth++;
    }
  }

  setInterval(updatePlayerAnimation, 10);
  function updatePlayerAnimation(){
    if(gamePaused) return;
    if(moving){
      player.addClass('player-moving');
      player.removeClass('player-idle');
    } else {
      player.addClass('player-idle');
      player.removeClass('player-moving');
    }

    if(leftDirection){
      player.addClass('left-direction');
    } else {
      player.removeClass('left-direction');
    }

    if(playerAttack1){
      player.addClass('player-attack');
    } else {
      player.removeClass('player-attack');
    }
  }

  function setDisplayName() {
    const value = $('#username-field').val();
    $('#username').text(value);
  }

  function collision($div1) {
      $('.enemy').each((index, el)=>{
        const element = $(el);
        const x1 = $div1.offset().left;
        const y1 = $div1.offset().top;
        const h1 = $div1.outerHeight(true);
        const w1 = $div1.outerWidth(true);
        const b1 = y1 + h1;
        const r1 = x1 + w1;
        const x2 = element.offset().left;
        const y2 = element.offset().top;
        const h2 = element.outerHeight(true);
        const w2 = element.outerWidth(true);
        const b2 = y2 + h2;
        const r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
      });
    }
});
