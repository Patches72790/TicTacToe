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
    const evaluateMove = () => {};
    
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
 * 
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


    let p1 = Player("X");
    p1.hasTurn = true;
    let p2 = Player("O");
    let winner;
    

    function setPlayerStates(player) {
        

    }

    function checkGameState () {
        let gameover = false;    
    
        // check row win
                
        // check col win

        // check diagonal wins
 
        return gameover;
    }


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

    return { updateBoard, checkGameState, getBoard };

})();

/**
 *
 */
function endGame() {


}


/**
 * This function sets the initial empty gameboard table
 * with event handlers and sets it as the child of the table div.
 *
 */
function createDOM() {

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

    selectPlayer();

    // replace empty table with new table
    gameBoardElement.replaceChild(newTable, oldTable); 
}

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
    
    //alert(player);

    //GameBoard.setPlayerStates(player);


}

