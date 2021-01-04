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

    const getMoves = () => { return moves }

    const toString = () => { return playerType }

    return {playerType, hasTurn, addMove, isHuman, getMoves, toString};
};

/**
 * Subclass of Player type that contains AI code
 * with minmax algorithm.
 *
 */
const Computer = (type) => {

    const prototype = Player(type, false);

    
    /** Determines the remaining moves left in the board
     * @param {number[][]} board reference to a gameboard array
     * @returns a list of remaining moves left on board
     */ 
    const getRemainingMoves = (board) => {
        let movesLeft = [];

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (!board[i][j]) {
                    movesLeft.push([i, j]);
                }
            }
        }
        return movesLeft;
    }

    /**
     * This function adds a new move from the remaining moves array to the
     * board.
     * 
     * @param {number[][]} board the board to be added to
     * @param {number[]} newMove the new move
     * @param {boolean} isHuman 
     */
    const addResultMove = (board, newMove, isHuman) => {
        let humanType = (type == "X") ? "O" : "X";
        let playerType = (!isHuman) ? type : humanType;

        board[newMove[0]][newMove[1]] = playerType;
        return board;
    }

    /**
     * This function returns whether the game board is
     * currently in a winning or terminal state.
     * 
     * @param {number[][]} board 
     * @param {number[][]} remainingMoves 
     */
    const boardIsTerminal = (board, remainingMoves) => {
        // tie
        return !remainingMoves ||
        // row wins
        (board[0][0] && board[0][1] && board[0][2]) ||
        (board[1][0] && board[1][1] && board[1][2]) ||
        (board[2][0] && board[2][1] && board[2][2]) ||
        // col wins
        (board[0][0] && board[1][0] && board[2][0]) ||
        (board[0][1] && board[1][1] && board[2][1]) ||
        (board[0][2] && board[1][2] && board[2][2]) ||
        // diagonal wins
        (board[0][0] && board[1][1] && board[2][2]) ||
        (board[0][2] && board[1][1] && board[2][0]);
    }

    /**
     * p1 is always computer, it returns +1.
     * p2 is always opponent and returns -1.
     * Ties return 0.
     * 
     * @param {number[][]} board 
     */
    function getBoardUtility(board) {
        let size = 3;


        for (var i = 0; i < size; i++) {
            let p1count = 0;
            let p2count = 0;

            for (var j = 0; j < size; j++) {
                if (board[i][j] == type) 
                    p1count++;
                else if (board[i][j])
                    p2count++;
            }

            if (p1count == size) {
                return 1;
            }

            else if (p2count == size) {
                return -1;
            }
        }

        // check col win
        for (var i = 0; i < size; i++) {
            let p1count = 0;
            let p2count = 0;

            for (var j = 0; j < size; j++) {
                if (board[j][i] == type) 
                    p1count++;
                else if (board[j][i])
                    p2count++;
            }

            if (p1count == size) {
                return 1;
            }

            else if (p2count == size) {
                return -1;
            }
        }

        // check left diagonal
        let p1count = 0;
        let p2count = 0;
        for (var i = 0, j = 0; i < size && j < size; i++, j++) {
            if (board[i][j] == type) 
                p1count++;
            else if (board[i][j])
                p2count++;
        }

        if (p1count == size) {
            return 1;
        }

        else if (p2count == size) {
            return -1;
        }

        // check right diagonal
        p1count = 0;
        p2count = 0;

        for (var i = 0, j = 2; i < size; i++, j--) {
            if (board[i][j] == type) 
                p1count++;
            else if (board[i][j])
                p2count++;
        }

        if (p1count == size) {
            return 1;
        }

        else if (p2count == size) {
            return -1;
        }
        // a tie game
        return 0;
    }

    /**
     * Function for that utilizes the minimax algorithm
     * the find the optimal move.
     * 
     * @param {number[][]} board - the current game board
     * @param {number[][]} remainingMoves - the remaining moves left in the board
     * @param {boolean} isHuman - true if is human turn, false if AI turn
     */
    const minimax = (board, remainingMoves, isHuman) => {

        // terminal state base case returns the utility of the board
        if (boardIsTerminal(board, remainingMoves)) {
            let boardValue = getBoardUtility(board);
            return boardValue;
        }

        // make new move
        board = addResultMove(board, remainingMoves.pop(), isHuman);


        // if ishuman minimize


        // if isAI maximize
        

    }

    /**
     * Helper function to create a deep copy of the game board from
     * the GameBoard class.
     * 
     * @returns the deep copy of the board
     */
    function makeDeepCopy() {
        let newArray = [[], [], []];
        let board = GameBoard.getBoard();

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                newArray[i][j] = board[i][j];
            }
        }
        return newArray;
    }

    // interface function for making move
    const makeMove = () => {

        let board = makeDeepCopy();
        let remainingMoves = getRemainingMoves(board);

        // find optimal move
        let move = minimax(board, remainingMoves, false);

        // add to moves array and return
        this.addMove(move[0], move[1])
        return move;
    }; 

    let interface = {makeMove, makeDeepCopy, minimax, boardIsTerminal, getRemainingMoves, getBoardUtility, addResultMove}
    return Object.assign({}, prototype, interface);
}


/**
 * This factory function module contains the gameboard data structure
 * and all relevant data for maintaining the tictac toe board.
 */
const GameBoard = (() => {

    // 2d array holding board
    // 0 - empty
    // X
    // O
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    // fields for GameBaord class
    const size = 3;
    let p1;
    let p2;
    let winner = null;
    
    /**
     * This function sets the initial player types and their state.
     * 
     * @param {string} p1Type 
     * @param {string} p2Type
     * @param {boolean} isAIOpponent
     */
    function setPlayerStates(p1Type, p2Type, isAIOpponent) {

        // set p1
        p1 = Player(p1Type, true);
        p1.hasTurn = true;

        // set p2 to either AI or human
        if (isAIOpponent)
            p2 = Computer(p2Type);
        else
            p2 = Player(p2Type, true);
    
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
                if (board[i][j] == p1.playerType) 
                    p1count++;
                else if (board[i][j] == p2.playerType)
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
                if (board[j][i] == p1.playerType) 
                    p1count++;
                else if (board[j][i] == p2.playerType)
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
            if (board[i][j] == p1.playerType) 
                p1count++;
            else if (board[i][j] == p2.playerType)
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
            if (board[i][j] == p1.playerType) 
                p1count++;
            else if (board[i][j] == p2.playerType)
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
     * @param {int} row - the row of the move to update
     * @param {int} col - the col of move to update
     * @returns the player type "X" or "O" of the move
     */
    function updateBoard(row, col) {

        board[row][col] = (p1.hasTurn) ? p1.playerType : p2.playerType;
        let player;

        // p1 human
        if (p1.hasTurn) {
            p1.addMove(row, col);
            player = p1.playerType;
            p1.hasTurn = false;
            p2.hasTurn = true;
        } 
        // p2 human
        else if (p2.isHuman) {
            p2.addMove(row, col);
            player = p2.playerType;
            p1.hasTurn = true;
            p2.hasTurn = false
        } 

        // AI move
        else {
            p2.makeMove();
            player = p2.playerType;
            p1.hasTurn = true;
            p2.hasTurn = false;
        }

        // check for winning game state
        if (checkGameState()) {
            endGame();
        }

        // return player type for DOM
        return player;
    }

    // returns gameboard list
    const getBoard = () => board;

    // returns the game winner
    const getWinner = () => winner;

    return { updateBoard, checkGameState, getBoard, getWinner, setPlayerStates };

})();

/**
 * Updates the DOM and ends the game showing the winner!
 */
function endGame() {
    let winnerDiv = document.getElementById("winner");
    let gameboard = document.getElementById("gameboardContainer");

    let newHeading = document.createElement("h2");
    newHeading.innerHTML = "Congratulations! Player " + GameBoard.getWinner() + " won the game!";
    winnerDiv.appendChild(newHeading);

    // updates display
    winnerDiv.style.display = "block";
    // gameboard.style.display = "none";
}


/**
 * This function sets the initial empty gameboard table
 * with event handlers and sets it as the child of the table div.
 *
 */
function createDOM() {

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

    // set display
    gameBoardElement.style.display = "block";

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

    if (!tableBox.innerHTML && !GameBoard.getWinner()) {
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

    //get the form data from selector form
    let playerForm = document.querySelector("form").children;
    let isAIOpponent = playerForm[2].childNodes[1].checked;

    // if player selected X
    if (playerForm[0].childNodes[1].checked) {
        GameBoard.setPlayerStates("X", "O", isAIOpponent);
    }
    // player selected O
    else if (playerForm[1].childNodes[1].checked) {
        GameBoard.setPlayerStates("O", "X", isAIOpponent);
    }

    // neither was checked return
    else {
        return;
    }

    // set up the board DOM
    createDOM();

    // set selector display to nothing
    document.getElementById("selectPlayer").remove();
}


let abc = Computer("X");
let board = [[0, 0, "0"],
             ["X", "X", "0"], 
             [0, 0, "0"]];

let move = [0, 0];
board = abc.addResultMove(board, move, false);
console.log(board);

let moves = abc.getRemainingMoves(board);
console.log(moves);