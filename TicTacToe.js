/**
* Class for containing information on player information
 * @param {string} type 
 * @param {boolean} isHuman
 * 
 * @returns playerType, hasTurn, and addMove
 */
const Player = (type, human) => {

    // playerType == X or O
    const playerType = type;
    let isHuman = human;

    // hasTurn = true or false
    let hasTurn = false;

    // moves Array holds tuples containing moves
        // e.g. [ (row, col), (row, col), ...] 
    const moves = [];

    const addMove = (row, col) => {
        moves.push( [row, col]);
    };

    return {playerType, hasTurn, addMove, isHuman};
};

/**
 * Subclass of Player type that contains AI code
 * with minmax algorithm.
 *
 */
const Computer = (type) => {

    const prototype = Player(type, false);
    
    // evaluation function 
    const evaluateMove = () => {

    }
    
    // minimax algorithm
    const minimax = (board, isHuman) => {

    }

    // interface function for making move
    const makeMove = () => {
        let move = minimax(GameBoard.getBoard(), false);
        return move;
    }; 

    return Object.assign({}, prototype, {makeMove});
}


/**
 * This factory function module contains the gameboard data structure
 * and all relevant data for maintaining the tictac toe board.
 */
const GameBoard = (() => {

    // 2d array holding board
    // 0 - empty
    // 1 - X
    // 2 - O
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    const size = 3;
    let p1 = Player("X");
    p1.hasTurn = true;
    let p2 = Player("O");
    let winner = null;
    

    /**
     * This function sets the initial player types and their state.
     * 
     * @param {Player} player 
     */
    function setPlayerStates(player) {

    
    }

    /**
     * This function checks the game state for a win.
     * 
     * @returns true if game board is in winning state and sets the winner field
     */
    function checkGameState () {
        let gameover = false;    
        // check row win
        for (var i = 0; i < size; i++) {
            let p1count = 0;
            let p2count = 0;

            for (var j = 0; j < size; j++) {
                if (board[i][j] == 1) 
                    p1count++;
                else if (board[i][j] == 2)
                    p2count++;
            }

            if (p1count == size) {
                gameover = true;
                winner = p1;
                return gameover;
            }

            else if (p2count == size) {
                gameover = true;
                winner = p2;
                return gameover;
            }
        }

        // check col win
        for (var i = 0; i < size; i++) {
            let p1count = 0;
            let p2count = 0;

            for (var j = 0; j < size; j++) {
                if (board[j][i] == 1) 
                    p1count++;
                else if (board[j][i] == 2)
                    p2count++;
            }

            if (p1count == size) {
                gameover = true;
                winner = p1;
                return gameover;
            }

            else if (p2count == size) {
                gameover = true;
                winner = p2;
                return gameover;
            }
        }

        // check left diagonal
        let p1count = 0;
        let p2count = 0;
        for (var i = 0, j = 0; i < size && j < size; i++, j++) {
            if (board[i][j] == 1) 
                p1count++;
            else if (board[i][j] == 2)
                p2count++;
        }

        if (p1count == size) {
            gameover = true;
            winner = p1;
            return gameover;
        }

        else if (p2count == size) {
            gameover = true;
            winner = p2;
            return gameover;
        }

        // check right diagonal
        p1count = 0;
        p2count = 0;

        for (var i = 0, j = 2; i < size; i++, j--) {
            if (board[i][j] == 1) 
                p1count++;
            else if (board[i][j] == 2)
                p2count++;
        }

        if (p1count == size) {
            gameover = true;
            winner = p1;
            return gameover;
        }

        else if (p2count == size) {
            gameover = true;
            winner = p2;
            return gameover;
        }

        return gameover;
    }

    /**
     * This function updates the board array to reflect player move.
     * 
     * @param {*} row - the row of the move to update
     * @param {*} col - the col of move to update
     * @returns the player type "X" or "O" of the move
     */
    function updateBoard(row, col) {
        board[row][col] = (p1.hasTurn) ? 1 : 2;
        let player;

        if (p1.hasTurn) {
            p1.addMove(row, col);
            player = p1.playerType;
            p1.hasTurn = false;
            p2.hasTurn = true;
        } else {
            p2.addMove(row, col);
            player = p2.playerType;
            p1.hasTurn = true;
            p2.hasTurn = false
        }

        if (checkGameState()) {
            endGame();
        }
        return player;
    }

    // returns gameboard list
    const getBoard = () => board;

    // returns the game winner
    const getWinner = () => winner;

    return { updateBoard, checkGameState, getBoard, getWinner };

})();

/**
 * Updates the DOM and ends the game showing the winner!
 */
function endGame() {
    let winnerDiv = document.getElementById("winner");
    let gameboard = document.getElementById("gameboardContainer");

    let newHeading = document.createElement("h2");
    newHeading.innerHTML = "Congratulations! " + GameBoard.getWinner() + " won the game!";
    winnerDiv.appendChild(newHeading);

    // updates display
    winnerDiv.style.display = "block";
    gameboard.style.display = "none";
}


/**
 * This function sets the initial empty gameboard table
 * with event handlers and sets it as the child of the table div.
 *
 */
function createDOM() {

    // select players for game
    selectPlayer();

    // sets up game board
    let gameBoardElement = document.getElementById("gameboardContainer");
    let oldTable = document.getElementById("gameboardTable");
    let currentBoard = GameBoard.getBoard();

    const newTable = (() => {
        let table = document.createElement("table");

        for (var i = 0; i < 3; i++) {
            let tr = document.createElement("tr");
                      
            for (var j = 0; j < 3; j++) {
                let td = document.createElement("td");
                td.setAttribute("onclick", "updateDOM(" + i +  ", "  + ( j) + ")");

                if (currentBoard[i][j] === 1) {
                    td.innerHTML = "X";
                } else if (currentBoard[i][j] === 2) {
                    td.innerHTML = "O";
                }

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        table.setAttribute("id", "gameboardTable");
        return table;
    })();

    // replace empty table with new table in DOM
    gameBoardElement.replaceChild(newTable, oldTable);
}

/**
 * This function is called to update the DOM display and 
 * update the gameboard data structure containing the board data.
 * 
 * @param {int} row 
 * @param {int} col 
 */
function updateDOM(row, col) {

    let table = document.getElementById("gameboardTable"); 
    let tableBox = table.children[row].children[col];

    if (!tableBox.innerHTML) {
        let player = GameBoard.updateBoard(row, col);
        tableBox.innerHTML = player;
    }

    return tableBox;
}


/**
 * Should select a player with an initial alert on 
 * loading the page.
 * 
 */
const selectPlayer = () => {
    
    //let player = prompt("Select Player Type: X or O");
    let selectElement = document.getElementById("selectPlayer");


    //alert(player);

    //GameBoard.setPlayerStates(player);


}

