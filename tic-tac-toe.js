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

    function checkBoardFilled() {
        for (let i = 0; i < 9; i++) {
            if (!Gameboard.getCell(i)) {
                return false;
            }
        }
        return true;
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
            DisplayController.displayWinner();
        } else if (checkBoardFilled()) {
            isGameOver = true;
            DisplayController.displayTie();
        } else {
            switchCurrentPlayer();
            DisplayController.displayCurrentPlayer();
        }
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
    const statusMessageElement = document.getElementById("status-message");

    for (cellElement of cellElementArray) {
        cellElement.addEventListener("click", function () {
            const cellIndex = Number(this.id);
            GameController.makeMove(cellIndex);
        });
    }

    function displayCurrentPlayer() {
        const playerSymbol = GameController.getCurrentPlayerSymbol();
        statusMessageElement.innerHTML = `Player ${playerSymbol} to move`;
    }

    function displayWinner() {
        const playerSymbol = GameController.getCurrentPlayerSymbol();
        statusMessageElement.innerHTML = `Player ${playerSymbol} Wins!`;
    }

    function displayTie() {
        statusMessageElement.innerHTML = `It's a Tie!`;
    }

    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            cellElementArray[i].innerHTML = Gameboard.getCell(i);
        }
    }


    return {
        renderBoard,
        displayCurrentPlayer,
        displayWinner,
        displayTie
    };
})();