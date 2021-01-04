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
     * @returns the updated board as a result of adding the new move
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
     * @returns true if the board is in final state, false otherwise
     */
    const boardIsTerminal = (board, remainingMoves) => {
        // terminal board if no remaining moves, or there is a winner (non-tie)
        return (remainingMoves.length == 0) || getBoardUtility(board);
    }

    /**
     * p1 is always computer, it returns +1.
     * p2 is always opponent and returns -1.
     * Ties return 0.
     * 
     * @param {number[][]} board 
     * @returns int value depending on utility of board and player type
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
     * @returns best move with value object
     */
    const minimax = (board, isHuman) => {

        // find remaining moves for board
        let remainingMoves = getRemainingMoves(board);

        // terminal state base case returns the utility of the board
        if (boardIsTerminal(board, remainingMoves)) {
            let boardValue = getBoardUtility(board);
            return boardValue;
        }

        // if isAI maximize choice
        if (!isHuman) {
            let minInfinity = -10000;
            var bestValue;
            var newMove;
            let length = remainingMoves.length;

            // iterate through remaining moves of board
            for (let i = 0; i < length; i++) {

                // make new move
                newMove = remainingMoves.shift();
                board = addResultMove(board, newMove, isHuman);

                // find max of possible moves
                bestValue = Math.max( minInfinity, minimax(board, true));

                // undo move and move on
                board[newMove[0]][newMove[1]] = 0;
            }

            return bestValue;
        }

        
        // if isHuman minimize choice
        else {
            let maxInfinity = 10000;
            var bestValue;
            var newMove;
            let length = remainingMoves.length;

            // work through remaining moves of board
            for (let i = 0; i < length; i++) {

                // make new move
                newMove = remainingMoves.shift();
                board = addResultMove(board, newMove, isHuman);

                // recursively find next
                bestValue = Math.min(maxInfinity, minimax(board, false));

                // undo move on board
                board[newMove[0]][newMove[1]] = 0;
            }

            return bestValue;
        }
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
        var bestValue = -10000;
        var bestMove;

        // find optimal move and clear map 
        let length = remainingMoves.length;

        for (var i = 0; i < length; i++) {

            var newMove = remainingMoves.shift();
            board = addResultMove(board, newMove, false);

            var currentValue = minimax(board, false);
            board[newMove[0]][newMove[1]] = 0;

            if (currentValue >= bestValue) {
                bestValue = currentValue;
                bestMove = newMove;
            }
        }

        // add to moves array and return
        prototype.addMove(bestMove[0], bestMove[1])
        return bestMove;
    }; 

    // let interface = {makeMove, makeDeepCopy, minimax, boardIsTerminal, getRemainingMoves, getBoardUtility, addResultMove};
    return Object.assign({}, prototype, { makeMove });
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
     * Getter function for detecting whether gameboard
     * has an AI player 2.
     * 
     * @returns true if has AI, false if 2 human players
     */
    const hasAIOpponent = () => {
        return !p2.isHuman;
    }

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

        // check for AI opponent
        if (this.hasAIOpponent() && p2.hasTurn) {
            let move = p2.makeMove();

            // update game board data structure
            if (move) {
                board[move[0]][move[1]] = p2.playerType;
            }

            let type = p2.playerType;
            p1.hasTurn = true;
            p2.hasTurn = false;

            if (checkGameState()) {
                endGame();
            }

            return {move, type};
        }

        // else human opponent
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

    return { updateBoard, checkGameState, getBoard, getWinner, setPlayerStates, hasAIOpponent };

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
    var tableBox = table.children[row].children[col];

    if (!tableBox.innerHTML && !GameBoard.getWinner()) {
        let player = GameBoard.updateBoard(row, col);
        tableBox.innerHTML = player;

        //TODO need to figure out how to update DOM with AI move
        if (GameBoard.hasAIOpponent() && !GameBoard.getWinner() ) {
            let aiMove = GameBoard.updateBoard(-1, -1);
            let moveIndices = aiMove["move"];

            // update new table index
            tableBox = table.children[moveIndices[0]].children[moveIndices[1]];
            tableBox.innerHTML = aiMove["type"];

        }
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



// let abc = Computer("O");
// let board = [["X", "O", "O"],
//              ["X", "X", "O"], 
//              [0, 0, 0]];

// let moves = abc.getRemainingMoves(board);

// let move = abc.minimax(board, moves, false);

// // abc.addResultMove(board, move, false);
// console.log(move);
// console.log(board);