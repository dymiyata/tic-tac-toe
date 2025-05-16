const gameboard = (function () {
    const board = Array(9).fill('');

    function makeMove(symbol, index) {
        if (board[index] === '') {
            board[index] = symbol;
        }
        renderBoard();
    }

    function renderBoard() {
        console.log(board.slice(0, 3));
        console.log(board.slice(3, 6));
        console.log(board.slice(6, 9));
    }

    return {
        makeMove,
        renderBoard,
    };
})();

