console.log('tic tac toe');

const gameBoard = (function (rows, columns) {
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = ' ';
    }
  };

  const placeMarker = function (marker, x, y) {
    if (y > rows || x > columns || y < 0 || x < 0) {
      console.log('Out of bounds')
    } else if (board[y][x] === ' ') {
      board[y][x] = marker;
      return true;
    } else {
      console.log('Occupied slot');
    }
    return false;
  };

  const currentBoard = function () {
    return board.map((arr) => arr.join('|')).join("\n-----\n")
  };

  const getBoard = () => board;

  const getTranspose = () => board[0].map((_, i) => board.map(x => x[i]))

  return { placeMarker, currentBoard, getBoard, getTranspose }
})(3, 3);

const player = function (name, marker){
  return { name, marker }
};

const playerOne = player("Player 1", "X");
const playerTwo = player("Player 2", "O");

const ticTacToe = (function (player1, player2, board) {

  const players = [player1, player2]
  let currentPlayerIndex = 0;

  const changePlayerIndex = function (playerIndex) {
    return 1 - playerIndex;
  };

  const playRound = function () {
    console.log(`It's ${players[currentPlayerIndex].name}'s turn`)
    const y = input = prompt("Which row?");
    const x = input = prompt("Which column?");
    if (board.placeMarker(players[currentPlayerIndex].marker, x, y)) {
      currentPlayerIndex = changePlayerIndex(currentPlayerIndex);
      console.log(`Current player: ${players[currentPlayerIndex].marker}`);
    } else {
      alert("Try again");
    };
  };

  const endgame = function () {
    const symbol = players[1 - currentPlayerIndex].marker
    if (win(symbol)) {
      console.log(`${players[1 - currentPlayerIndex].name} wins!`);
      return true;
    } else if (gameBoard.getBoard().flat().includes(' ')) {
      return false;
    } else {
      console.log('Draw');
      return true;
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
    const size = playingBoard.length
    const firstDiagonal = [];
    const secondDiagonal = [];
    for (let i = 0; i < size; i++) {
      firstDiagonal.push(playingBoard[i][i]);
      secondDiagonal.push(playingBoard[size - 1 - i][i])
    };
    return [firstDiagonal, secondDiagonal].some((diagonal) => diagonal.every((el) => el === symbol));
  };

  const playGame = function () {
    while (!endgame()) {
      playRound();
      console.log(board.currentBoard());
    };
    console.log('Game done');
  };

  return { playGame };
})(playerOne, playerTwo, gameBoard);
