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

let randNum = 0; //랜덤으로 뽑을 숫자
let inputNum = document.getElementById('inputNum'); // 사용자가 입력할 숫자
let reaction = document.getElementById('reaction'); // 결과에 대한 반응
let playButton = document.getElementById('playButton');
let resetButton = document.getElementById('resetButton');
let shareButton = document.getElementById('shareButton');
let resultAreaImg = document.querySelector('.main-img');
let chance = document.getElementById('chance');
let tryCount = 3; // 남은 기회
let histNum = []; // 사용자가 입력한 숫자들
let answerNumber = document.getElementById('answerNumber');
let hist = document.getElementById('hist');
let ongoing = true; // 게임 진행중인가

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
shareButton.addEventListener('click', share);
focusInput = inputNum.addEventListener('focus', function () {
  inputNum.value = '';
}); // 사용자가 입력창 누르면 이전값 지우기

function pickNum() {
  // 랜덤 숫자 뽑기
  randNum = Math.floor(Math.random() * 100) + 1;
  console.log(randNum);
  answerNumber.textContent = `(정답${randNum})`;
}
function play() {
  // 숫자 추측하기
  let inputNumValue = inputNum.value;

  // console.log(histNum);

  if (inputNumValue > 0 && inputNumValue <= 100) {
    if (histNum.includes(inputNumValue)) {
      reaction.textContent = '이미 입력한 숫자입니다';
    } else {
      tryCount--;
      histNum.push(inputNumValue);
      if (inputNumValue > randNum) {
        resultAreaImg.src = 'img/down.webp';

        reaction.textContent = 'Down!!';
      } else if (inputNumValue < randNum) {
        resultAreaImg.src = 'img/up.webp';
        reaction.textContent = 'Up!!';
      } else {
        resultAreaImg.src = 'img/success.webp';
        reaction.textContent = '맞췄습니다!';
        hist.textContent = `시도한 숫자: ${[...new Set(histNum)]}`;
        playButton.disabled = true;
        ongoing = false;
      }
    }
  } else {
    reaction.textContent = '1~100 사이의 값을 입력해주세요';
  }

  chance.textContent = `남은기회:${tryCount}번`;
  if (tryCount < 1 && ongoing == true) {
    playButton.disabled = true;
    resultAreaImg.src = 'img/fail.webp';
    reaction.textContent = '실패!!';
    hist.textContent = `시도한 숫자: ${[...new Set(histNum)]}`;
  }
}

function reset() {
  // 리셋
  resultAreaImg.src =
    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnVqcWNhcXhyM2R1YmliaWhiODcwemk5OGpoenZlcHFlN2czMXQ4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7eAvzJ0SBBzHy/giphy.webp';
  playButton.disabled = false;
  inputNum.value = '';
  tryCount = 3;
  chance.textContent = `남은기회:${tryCount}번`;
  histNum = [];
  hist.textContent = '';
  reaction.textContent = '다시 도전!';

  pickNum();
}
function share() {
  // 공유하기버튼 url 복사
  let url = '';
  let textarea = document.createElement('textarea');
  document.body.appendChild(textarea);
  url = window.document.location.href;
  textarea.value = url;
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('URL이 복사되었습니다.');
}

pickNum();
