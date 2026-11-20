const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton');
const resetScoreButton = document.getElementById('resetScoreButton');
const player1WinsElement = document.getElementById('player1Wins');
const player2WinsElement = document.getElementById('player2Wins');
const drawsElement = document.getElementById('draws');
let oTurn;
let player1Wins = 0;
let player2Wins = 0;
let draws = 0;

startGame();

restartButton.addEventListener('click', startGame);
resetScoreButton.addEventListener('click', resetScore);

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Empate!';
        draws++;
    } else {
        winningMessageTextElement.innerText = `O ${oTurn ? "Jogador 2" : "Jogador 1"} venceu!`;
        if (oTurn) {
            player2Wins++;
        } else {
            player1Wins++;
        }
    }
    updateScoreboard();
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function updateScoreboard() {
    player1WinsElement.innerText = `Jogador 1: ${player1Wins}`;
    player2WinsElement.innerText = `Jogador 2: ${player2Wins}`;
    drawsElement.innerText = `Empates: ${draws}`;
}

function resetScore() {
    player1Wins = 0;
    player2Wins = 0;
    draws = 0;
    updateScoreboard();
}
