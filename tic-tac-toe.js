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
    let isGameOver = false;

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
        const isInvalidMove = Boolean(isGameOver || Gameboard.getCell(index));
        if (isInvalidMove) {
            console.log("invalid");
            return;
        }

        Gameboard.setCell(index, currentPlayer.symbol);
        DisplayController.renderBoard();

        if (checkWinner(currentPlayer.symbol)) {
            isGameOver = true;
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
    const boardElement = document.getElementById("board");
    const cellElementArray = boardElement.children;

    for (cellElement of cellElementArray) {
        cellElement.addEventListener("click", function () {
            const cellIndex = Number(this.id);
            GameController.makeMove(cellIndex);
        });
    }

    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            cellElementArray[i].innerHTML = Gameboard.getCell(i);
        }
    }

    return {
        renderBoard,
    };
})();