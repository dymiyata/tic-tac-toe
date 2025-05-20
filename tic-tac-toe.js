const Gameboard = (function () {
    const board = Array(9).fill('');

    function getCell(index) {
        return board[index];
    }

    function setCell(index, symbol) {
        board[index] = symbol;
        return;
    }

    return {
        getCell,
        setCell
    };
})();

function createPlayer(symbol) {
    return { symbol };
}

const GameController = (function () {
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');

    let currentPlayer = playerX;

    function switchCurrentPlayer() {
        currentPlayer = (currentPlayer === playerX) ? playerO : playerX;
        return currentPlayer;
    }

    function checkWinner(symbol) {
        const winningCombosArray = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const combo of winningCombosArray) {
            isComboMatchingSymbol = (
                Gameboard.getCell(combo[0]) == symbol &&
                Gameboard.getCell(combo[1]) == symbol &&
                Gameboard.getCell(combo[2]) == symbol
            );
            if (isComboMatchingSymbol) {
                return true;
            }
        }
        return false;
    }

    function makeMove(index) {
        if (Gameboard.getCell(index)) {
            return;
        }
        Gameboard.setCell(index, currentPlayer.symbol);
        if (checkWinner(currentPlayer.symbol)) {
            console.log("WINNER");
        } else {
            console.log("Not yet");
        }
        switchCurrentPlayer();
    }

    function getCurrentPlayerSymbol() {
        return currentPlayer.symbol;
    }



    return {
        makeMove,
        getCurrentPlayerSymbol,
    }
})();

const DisplayController = (function () {
    return;
})();


// function makeMove(symbol, index) {
//     if (board[index] === '') {
//         board[index] = symbol;
//     }
//     renderBoard();
// }

// function renderBoard() {
//     console.log(board.slice(0, 3));
//     console.log(board.slice(3, 6));
//     console.log(board.slice(6, 9));
// }

// function isInWinningRow(position) {
//     const currentRow = Math.floor(position / 3);
//     const startOfRowIndex = 3 * currentRow;
//     if (board[startOfRowIndex] === board[startOfRowIndex + 1] && board[startOfRowIndex] === board[startOfRowIndex + 2]) {
//         return true;
//     }
//     return false;
// }

// function isInWinningColumn(position) {
//     const currentColumn = position % 3;
//     if (board[currentColumn] === board[currentColumn + 3] && board[currentColumn] === board[currentColumn + 2 * 3]) {
//         return true;
//     }
//     return false;
// }

// function isInWinningDiagonal(position) {

//     const isOnFirstDiag = (position % 4 == 0);
//     const isFirstDiagEqual = (board[0] == board[4] && board[0] == board[8]);
//     if (isOnFirstDiag && isFirstDiagEqual) {
//         return true;
//     }

//     const isOnSecondDiag = (position % 4 == 2 || position == 4);
//     const isSecondDiagEqual = (board[2] == board[4] && board[0] == board[6]);
//     if (isOnSecondDiag && isSecondDiagEqual) {
//         return true;
//     }

//     return false;

// }

// function isWinningMove(position) {
//     return isInWinningRow(position) || isInWinningColumn(position) || isInWinningDiagonal(position);
// }
