const boardLocations = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let turnPlayer = '';
let currentPlayer = '';

const inName1 = document.querySelector("#inName1");
const inName2 = document.querySelector("#inName2");

function verifyNames() {
  name1 = inName1.value;
  name2 = inName2.value;
  if (name1 == "") {
    alert("Please, write a valid name for the first player.");
    inName1.focus();
    return;
  } else if (name2 == "") {
    alert("Please, write a valid name for the second player");
    inName2.focus();
    return;
  } else {
    getNames();
  }
}
function getNames() {
  inName1.setAttribute("disabled", !inName1.disabled);
  inName2.setAttribute("disabled", !inName2.disabled);
  start();
}
function start() {
  boardLocations.forEach(function (ev) {
    ev.removeEventListener("click", error)
  });
  vBoard = [["", "", ""],["", "", ""],["", "", ""],];
  boardLocations.forEach(function (ev) {
    ev.addEventListener("click", click);
    ev.classList.add('cursor');
    ev.classList.remove('win');
    ev.textContent = '';
  });
  const btnConfirm = document.querySelector('#btnConfirm');
  btnConfirm.setAttribute('disabled', btnConfirm.disabled);
  btnConfirm.classList.add('disable');
  changeNames();
  const btnPlayAgain = document.querySelector('#btnPlayAgain');
  btnPlayAgain.setAttribute('disabled', !btnPlayAgain.disabled);
  btnPlayAgain.classList.remove('playAgain');
  btnPlayAgain.classList.add('disable');
}
function changeNames() {
  if (turnPlayer == "") {
    turnPlayer = "player1";
  } else if (turnPlayer == "player1") {
    turnPlayer = "player2";
  } else {
    turnPlayer = "player1";
  }
  if (turnPlayer == "player1") {
    currentPlayer = inName1.value;
  } else if (turnPlayer == "player2") {
    currentPlayer = inName2.value;
  }
  document.querySelector("#turnPlayerArea").textContent = `player's turn: ${currentPlayer}`;
}
function click(ev) {
  const span = ev.currentTarget;
  const location = span.dataset.location;
  const specificLocation = location.split(".");
  const column = specificLocation[0];
  const row = specificLocation[1];
  if (turnPlayer == "player1") {
    span.textContent = "X";
    vBoard[column][row] = "X";
  } else {
    span.textContent = "O";
    vBoard[column][row] = "O";
  }
  removeClick(span);
  console.clear();
  console.table(vBoard);
  if(checkWin() == false){
    changeNames();
  }
}
function removeClick(local){
  local.removeEventListener('click', click);
  local.classList.remove('cursor');
}
function checkWin() {
  if((vBoard[0][0] == vBoard[0][1] && vBoard[0][1] == vBoard[0][2]) && vBoard[0][0] != ''){
    boardLocations[0].classList.add('win');
    boardLocations[1].classList.add('win');
    boardLocations[2].classList.add('win');
    win();
  } else if((vBoard[1][0] == vBoard[1][1] && vBoard[1][1] == vBoard[1][2]) && vBoard[1][0] != ''){
    boardLocations[3].classList.add('win');
    boardLocations[4].classList.add('win');
    boardLocations[5].classList.add('win');
    win();
  } else if((vBoard[2][0] == vBoard[2][1] && vBoard[2][1] == vBoard[2][2]) && vBoard[2][0] != ''){
    boardLocations[6].classList.add('win');
    boardLocations[7].classList.add('win');
    boardLocations[8].classList.add('win');
    win();
  } else if((vBoard[0][0] == vBoard[1][0] && vBoard[1][0] == vBoard[2][0]) && vBoard[0][0] != ''){
    boardLocations[0].classList.add('win');
    boardLocations[3].classList.add('win');
    boardLocations[6].classList.add('win');
    win();
  } else if((vBoard[0][1] == vBoard[1][1] && vBoard[1][1] == vBoard[2][1]) && vBoard[0][1] != ''){
    boardLocations[1].classList.add('win');
    boardLocations[4].classList.add('win');
    boardLocations[7].classList.add('win');
    win();
  } else if((vBoard[0][2] == vBoard[1][2] && vBoard[1][2] == vBoard[2][2]) && vBoard[0][2] != ''){
    boardLocations[2].classList.add('win');
    boardLocations[5].classList.add('win');
    boardLocations[8].classList.add('win');
    win();
  } else if((vBoard[0][0] == vBoard[1][1] && vBoard[1][1] == vBoard[2][2]) && vBoard[0][0] != ''){
    boardLocations[0].classList.add('win');
    boardLocations[4].classList.add('win');
    boardLocations[8].classList.add('win');
    win();
  } else if((vBoard[0][2] == vBoard[1][1] && vBoard[1][1] == vBoard[2][0]) && vBoard[0][2] != ''){
    boardLocations[2].classList.add('win');
    boardLocations[4].classList.add('win');
    boardLocations[6].classList.add('win');
    win();
  } else if(!vBoard[0].includes('') && !vBoard[1].includes('') && !vBoard[2].includes('')){
    draw();
  }else {
    return false;
  }
}
function draw() {
  boardLocations.forEach(removeClick);
  
  const turnPlayerArea = document.querySelector("#turnPlayerArea");
  turnPlayerArea.classList.add('draw');
  turnPlayerArea.textContent = `Draw!`;
  prepareBtn();
}
function win() {
  boardLocations.forEach(removeClick);
  
  const turnPlayerArea = document.querySelector("#turnPlayerArea");
  turnPlayerArea.classList.add('winner');
  turnPlayerArea.textContent = `Winner: ${currentPlayer}`;
  prepareBtn();
}
function prepareBtn() {
  const btnPlayAgain = document.querySelector('#btnPlayAgain');
  btnPlayAgain.removeAttribute('disabled', btnPlayAgain.disabled);
  btnPlayAgain.classList.add('playAgain');
  btnPlayAgain.classList.remove('disable');
}
function playAgain() {
  inName1.value = '';
  inName2.value = '';
  inName1.removeAttribute("disabled", inName1.disabled);
  inName2.removeAttribute("disabled", inName2.disabled);
  turnPlayer = '';
  currentPlayer = '';
  const btnConfirm = document.querySelector('#btnConfirm');
  btnConfirm.removeAttribute('disabled', btnConfirm.disabled);
  btnConfirm.classList.remove('disable');
  const turnPlayerArea = document.querySelector("#turnPlayerArea");
  turnPlayerArea.classList.remove('winner');
  turnPlayerArea.classList.remove('draw');
  document.querySelector('#turnPlayerArea').textContent = 'Status:'
}
function error() {
  alert('Please, start the game first.');
  document.querySelector('#btnConfirm').focus();
}


boardLocations.forEach(function (ev) {
  ev.addEventListener("click", error)
});

const btnConfirm = document.querySelector("#btnConfirm").addEventListener("click", verifyNames);
const btnPlayAgain = document.querySelector('#btnPlayAgain').addEventListener('click', playAgain);