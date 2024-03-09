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
    } else {
      console.log('Occupied slot');
    }
  };

  const currentBoard = function () {
    return board.map((arr) => arr.join('|')).join("\n-----\n")
  };

  return { placeMarker, currentBoard }
})(3, 3);
