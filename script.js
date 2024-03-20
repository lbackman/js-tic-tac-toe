console.log('tic tac toe');

const gameBoard = (function (rows, columns) {
  const board = [];

  const resetBoard = function () {
    board.length = 0;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = ' ';
      };
    };
  };

  resetBoard();

  const placeMarker = function (marker, x, y) {
    if (y > rows || x > columns || y < 0 || x < 0) {
      console.log('Out of bounds')
    } else if (board[y][x] === ' ') {
      board[y][x] = marker;
      return true;
    } else {
      console.log('Occupied slot');
    };
    return false;
  };

  const currentBoard = function () {
    return board.map((arr) => arr.join('|')).join("\n-----\n");
  };

  const getBoard = () => board;

  const getTranspose = () => board[0].map((_, i) => board.map(x => x[i]));

  return { placeMarker, currentBoard, resetBoard, getBoard, getTranspose };
})(3, 3);

const player = function (name, marker){
  return { name, marker };
};

const playerOne = player("Player 1", "X");
const playerTwo = player("Player 2", "O");

const gameDisplay = (function () {
  const boxes = document.querySelectorAll('.box');
  const messageBox = document.querySelector('.message');

  const updateBoard = function (board, col, row) {
    // map index from 2d to 1d array
    const index = board.length * col + row;
    boxes[index].textContent = board[col][row];
  };

  const clearBoard = function () {
    boxes.forEach(box => box.textContent = ' ');
  };

  const updateMessage = function (message) {
    messageBox.textContent = message;
  };
  return { updateBoard, clearBoard, updateMessage };
})();

const ticTacToe = function (player1, player2, board, display) {
  let gameOver = false;

  const players = [player1, player2];
  let currentPlayerIndex = 0;

  const changePlayerIndex = function (playerIndex) {
    return 1 - playerIndex;
  };

  const initialMessage = function () {
    display.updateMessage(`New game started, ${players[currentPlayerIndex].name} starts`);
    console.log('New game started');
    console.log(`${players[currentPlayerIndex].name} starts`);
  };

  const playRound = function (y, x) {
    if (!gameOver) {
      if (board.placeMarker(players[currentPlayerIndex].marker, x, y)) {
        currentPlayerIndex = changePlayerIndex(currentPlayerIndex);
        setGameStatus();
        console.log(board.currentBoard());
        display.updateBoard(board.getBoard(), y, x);
      };
    };
  };

  const restartGame = function () {
    gameOver = false;
    currentPlayerIndex = 0;
    board.resetBoard();
    display.clearBoard();
    initialMessage();
  };

  const setGameStatus = function () {
    const symbol = players[1 - currentPlayerIndex].marker;
    if (win(symbol)) {
      gameOver = true;
      const winner = players[1 - currentPlayerIndex];
      display.updateMessage(`${winner.name} wins!`);
      console.log(`${winner.name} wins!`)
    } else if (gameBoard.getBoard().flat().includes(' ')) {
      display.updateMessage(`Current player: ${players[currentPlayerIndex].name} (${players[currentPlayerIndex].marker})`);
      console.log(`Current player: ${players[currentPlayerIndex].name} (${players[currentPlayerIndex].marker})`);
    } else {
      gameOver = true;
      display.updateMessage('Draw');
      console.log('Draw');
    };
  };

  const win = function (symbol) {
    // check rows, columns and diagonals for win conditions
    return winRow(board.getBoard(), symbol) || winRow(board.getTranspose(), symbol) || winDiagonal(board.getBoard(), symbol);
  };

  const winRow = function (playingBoard, symbol) {
    return playingBoard.some((row) => row.every((tile) => tile === symbol));
  };

  const winDiagonal = function (playingBoard, symbol) {
    const size = playingBoard.length;
    const firstDiagonal = [];
    const secondDiagonal = [];
    for (let i = 0; i < size; i++) {
      firstDiagonal.push(playingBoard[i][i]);
      secondDiagonal.push(playingBoard[size - 1 - i][i]);
    };
    return [firstDiagonal, secondDiagonal].some((diagonal) => diagonal.every((el) => el === symbol));
  };

  return { initialMessage, playRound, restartGame };
};

const startGame = function () {
  const name1Field = document.getElementById('name1');
  const name2Field = document.getElementById('name2');
  const name1 = name1Field.value.trim();
  const name2 = name2Field.value.trim();
  if (name1 != '' && name2 != '' && name1 != name2) {
    const game = ticTacToe(player(name1, 'X'), player(name2, 'O'), gameBoard, gameDisplay)
    game.initialMessage();
    document.querySelector('.board').addEventListener('click', function (e) {
      if (e.target && e.target.matches('.box')) {
        const position = e.target.dataset.position.split(',').map((el) => Number(el));
        game.playRound(...position);
      };
    });
    startGameButton.removeEventListener("click", startGame);
    startGameButton.disabled = true;
    name1Field.disabled = true;
    name2Field.disabled = true;
    const restartGameButton = document.querySelector('.restart-game');
    restartGameButton.addEventListener("click", game.restartGame);
  }
};

const startGameButton = document.querySelector('.start-game');
startGameButton.addEventListener("click", startGame);
