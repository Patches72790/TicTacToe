const Player = (type) => {

    // playerType == X or O
    const playerType = type;

    // hasTurn = true or false
    let hasTurn = false;
    let isHuman;

    // moves Array holds tuples containing moves
        // e.g. [ (row, col), (row, col), ...] 
    const moves = [];

    const addMove = (row, col) => {
        moves.push( [row, col]);
    };

    return {playerType, hasTurn, addMove};
};


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
    let p2 = Player("O");
    let winner;
    

    function checkGameState () {

        // check row win
        
        // check col win

        // check diagonal wins

    }


    function updateBoard(row, col) {
        board[row][col] = (p1.hasTurn) ? 1 : 2;

        if (p1.hasTurn) {
            p1.addMove(row, col);
        } else {
            p2.addMove(row, col);
        }



    }

    // returns gameboard list
    const getBoard = () => board;


    return { updateBoard, checkGameState, getBoard };

})();




function UpdateDOM() {

    let gameBoardElement = document.getElementById("gameboardContainer");
    let oldTable = document.getElementById("gameboardTable");
    let currentBoard = GameBoard.getBoard();

    const newTable = (() => {
        let table = document.createElement("table");

        for (var i = 0; i < 3; i++) {
            let tr = document.createElement("tr");
            
            for (var j = 0; j < 3; j++) {
                let td = document.createElement("td");

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


    gameBoardElement.replaceChild(newTable, oldTable); // TODO fix problem with replace
}


/**
 * Should select a player with an initial alert on 
 * loading the page.
 * 
 */
const selectPlayer = () => {




}

