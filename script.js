console.log('tic tac toe');

const gameBoard = (function (rows, columns) {
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = ' ';
    };
  };

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

  return { placeMarker, currentBoard, getBoard, getTranspose };
})(3, 3);

const player = function (name, marker){
  return { name, marker };
};

const playerOne = player("Player 1", "X");
const playerTwo = player("Player 2", "O");

const ticTacToe = (function (player1, player2, board) {
  let gameOver = false;

  const players = [player1, player2];
  let currentPlayerIndex = 0;

  const changePlayerIndex = function (playerIndex) {
    return 1 - playerIndex;
  };

  const playRound = function (y, x) {
    if (!gameOver) {
      if (board.placeMarker(players[currentPlayerIndex].marker, x, y)) {
        currentPlayerIndex = changePlayerIndex(currentPlayerIndex);
        setGameStatus();
        console.log(board.currentBoard());
      };
      
    };
  };

  const setGameStatus = function () {
    const symbol = players[1 - currentPlayerIndex].marker;
    if (win(symbol)) {
      gameOver = true;
      const winner = players[1 - currentPlayerIndex];
      console.log(`${winner.name} wins!`)
    } else if (gameBoard.getBoard().flat().includes(' ')) {
      console.log(`Current player: ${players[currentPlayerIndex].marker}`);
    } else {
      gameOver = true;
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

  return { playRound };
})(playerOne, playerTwo, gameBoard);

const startGame = function () {
  document.querySelector('.board').addEventListener('click', function (e) {
    if (e.target && e.target.matches('.box')) {
      const position = e.target.dataset.position.split(',').map((el) => Number(el));
      ticTacToe.playRound(...position);
    };
  });
};

const startGameButton = document.querySelector('.start-game');
startGameButton.addEventListener("click", startGame);
