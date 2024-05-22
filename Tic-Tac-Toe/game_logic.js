let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks').trim(); // Trim to remove any whitespace
//const winnerIndicator = '#c49600'; // Set the winning indicator color directly

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

let spaces = Array(25).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator); 
            return; 
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;   
    }
}

const winningCombos = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c, d, e] = condition;

        if (spaces[a] && (spaces[a] === spaces[b] && spaces[b] === spaces[c] && spaces[c] === spaces[d] && spaces[d] === spaces[e])) {
            return [a, b, c, d, e];
        }
    }
    return false;
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })
    currentPlayer = X_TEXT;
    playerText.innerHTML = ''; // Clear the winner text
}

startGame();