/*로직
  랜덤번호 지정
  유저가 번호를 입력한다 그리고 go 라는 버튼을 누름
  만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
  랜덤번호가 <유저번호 Down!!!
  랜덤번호가 > 유전번호 Up!!
  Reset버튼을 누르면 게임이 리셋된다
  5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable)
  유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다
  유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깎지 않는다
*/

let randNum = 0;

let inputNum = document.getElementById('inputNum');
let reaction = document.getElementById('reaction');
let playButton = document.getElementById('playButton');
let resetButton = document.getElementById('resetButton');
let resultAreaImg = document.querySelector('.main-img');
let tryCount = 5;
let chance = document.getElementById('chance');
let histNum = [];

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
focusInput = inputNum.addEventListener('focus', function () {
  inputNum.value = '';
}); //focusin

function pickNum() {
  randNum = Math.floor(Math.random() * 100) + 1;
  console.log(randNum);
}
function play() {
  let inputNumValue = inputNum.value;

  console.log(histNum);

  if (inputNumValue > 0 && inputNumValue <= 100) {
    if (histNum.includes(inputNumValue)) {
      reaction.textContent = '이미 입력한 숫자입니다';
    } else {
      tryCount--;

      if (inputNumValue > randNum) {
        resultAreaImg.src = 'img/down.webp';

        reaction.textContent = 'Down!!';
      } else if (inputNumValue < randNum) {
        resultAreaImg.src = 'img/up.webp';

        reaction.textContent = 'Up!!';
      } else {
        resultAreaImg.src = 'img/success.webp';
        reaction.textContent = '맞췄습니다!';
        playButton.disabled = true;
      }
    }
    histNum.push(inputNumValue);
  } else {
    reaction.textContent = '1~100 사이의 값을 입력해주세요';
  }

  chance.textContent = `남은기회:${tryCount}번`;
  if (tryCount < 1) {
    playButton.disabled = true;
    resultAreaImg.src = 'img/fail.webp';
    reaction.textContent = '실패!!';
  }
}

function reset() {
  resultAreaImg.src =
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVqcWNhcXhyM2R1YmliaWhiODcwemk5OGpoenZlcHFlN2czMXQ4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7eAvzJ0SBBzHy/giphy.webp';
  playButton.disabled = false;
  inputNum.value = '';
  tryCount = 5;
  chance.textContent = `남은기회:${tryCount}번`;
  histNum = [];
  reaction.textContent = '다시 도전!';

  pickNum();
}

pickNum();
if (inputNum.focus == true) {
  console.log('true');
}
