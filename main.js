/*----- constants -----*/
const lookup = {
    "1": '#6a5acd',
    "-1": '#ee81ee',
    "null": "",
};

const columnCheck = [
    [0,7,14,21,28,35], [1,8,15,22,29,36], [2,9,16,23,30,37],
    [3,10,17,24,31,38], [4,11,18,25,32,39], [5,12,19,26,33,40], [6,13,20,27,34,41],
];

const winningCombos = [
    // horizontal winning combos
    [0,1,2,3], [1,2,3,4], [2,3,4,5], [3,4,5,6], [7,8,9,10],
    [8,9,10,11], [9,10,11,12], [10,11,12,13], [14,15,16,17], [15,16,17,18],
    [16,17,18,19], [17,18,19,20], [21,22,23,24], [22,23,24,25], [23,24,25,26],
    [24,25,26,27], [28,29,30,31], [29,30,31,32], [30,31,32,33], [31,32,33,34],
    [35,36,37,38], [36,37,38,39], [37,38,39,40], [38,39,40,41],
    // vertical winning combos
    [0,7,14,21], [1,8,15,22], [2,9,16,23], [3,10,17,24], [4,11,18,25], [5,12,19,26],
    [6,13,20,27], [7,14,21,28], [8,15,22,29], [9,16,23,30], [10,17,24,31],
    [11,18,25,32], [12,19,26,33], [13,20,27,34], [14,21,28,35], [15,22,29,36],
    [16,23,30,37], [17,24,31,38], [18,25,32,39], [19,26,33,40], [20,27,34,41],
    // diagonal winning combos
    [0,8,16,24], [1,9,17,25], [2,10,18,26], [3,11,19,27], [6,12,18,24],
    [7,15,24,31], [5,11,17,23], [8,16,25,32], [4,10,16,22], [9,17,26,33],
    [3,9,15,21], [13,19,25,31], [14,22,30,38], [12,18,24,30], [15,23,31,39],
    [11,17,23,29], [16,24,32,40], [10,16,22,28], [17,25,33,41], [20,26,32,38],
    [19,25,31,37], [18,24,30,36], [17,23,29,35],];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached(select and save)element references -----*/
const circleEls = document.querySelectorAll('td');
const winnerEl = document.querySelector('h2');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/*----- functions -----*/
initialize();

// Initialize the state variables
function initialize() {
    board = [null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null,
            null, null, null, null, null, null, null];
    winner = null;
    turn = 1;
    render();
}

function render() {
    board.forEach(function(circle, idx) {
        circleEls[idx].style.background = lookup[circle];
    });
    if (winner === 1) {
        winnerEl.textContent = "Purple Wins!";
    } else if (winner === -1) {
        winnerEl.textContent = "Pink Wins!";
    } else if (winner === "tie") {
        winnerEl.textContent = "Cats Game!";
    } else {
        winnerEl.textContent = "";
    }
}

function handleMove(event) {
    // Make sure the user clicks on a circle and nothing outside of the circle
    if (event.target.tagName !== "TD") return;

    // Grab index value from the circle clicked on
    const idx = parseInt(event.target.id.replace('cir', ''));

    // Check the values of the row
    let columnIdx = 0;
    columnCheck.forEach(function(col, index) {
        if(col.includes(idx)) {
            columnIdx = index;
        };
    });
    if (board[idx] || winner) return;

    // Circle must be put into the latest available index array of that column
    for (let i = 5; i > -1; i--) {
        if (board[columnCheck[columnIdx][i]] === null) {
            board[columnCheck[columnIdx][i]] = turn;
            break;
        };
        // Update the new array
        columnCheck[columnIdx][i];
    };
    // Change the player's turn
    turn *= -1;
    // Finding a winner
    winner = getWinner();
    // Call render to change the background of each player's turn
    render();
}

function getWinner() {
    for (let i = 0; i < winningCombos.length; i++) {
        if (Math.abs(
            board[winningCombos[i][0]] + 
            board[winningCombos[i][1]] +
            board[winningCombos[i][2]] +
            board[winningCombos[i][3]])
            === 4) {
            return board[winningCombos[i][0]];
        };
    };
    if (board.includes(null)) return null;
    return "tie";
}