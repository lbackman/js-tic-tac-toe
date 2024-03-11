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

  return { placeMarker, currentBoard }
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
    const y = input = prompt("Which row?");
    const x = input = prompt("Which column?");
    if (board.placeMarker(players[currentPlayerIndex].marker, x, y)) {
      currentPlayerIndex = changePlayerIndex(currentPlayerIndex);
      console.log(`Current player: ${players[currentPlayerIndex].marker}`);
    } else {
      alert("Try again");
    };
  };

  const playGame = function () {
    while (true) {
      playRound();
      console.log(board.currentBoard());
    };
  };

  return { playGame };
})(playerOne, playerTwo, gameBoard);
