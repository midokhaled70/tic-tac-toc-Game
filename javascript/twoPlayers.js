

const X_CLASS = 'X'
const CIRCLE_CLASS = 'O'
let X_Score = 0;
let O_Score = 0;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn //variable=1 o's turn, 0 x's turn 
const reset = document.getElementById('reset');
reset.addEventListener('click',function(){
  O_Score = 0;
  X_Score=0;
  document.getElementById('oScore').innerText = `${O_Score}`
  document.getElementById('xScore').innerText = `${X_Score}`
  startGame()
})


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.innerHTML = ' '
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true }) //only one click allowed
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS //circle's turn? return circle class else return x's class
  placeMark(cell, currentClass) //call placeMark 
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    if (circleTurn) {
      O_Score += 3;
      document.getElementById('oScore').innerText = `${O_Score}`
    } else {
      X_Score += 3;
      document.getElementById('xScore').innerText = `${X_Score}`
    }
    winningMessageTextElement.innerText = `${circleTurn ? "O'" : "X'"} Win!`;
    
  }
  winningMessageElement.classList.add('show')
  
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
  cell.innerHTML = `${currentClass}`
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}