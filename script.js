      //Gameboard module
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => [...board];

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };

  const isCellEmpty = (index) => board[index] === "";

  const markCell = (index, playerSymbol) => {
    if (isCellEmpty(index)) {
      board[index] = playerSymbol;
      return true;
    }
    return false;
  };

  return { getBoard, resetBoard, markCell };
})();

      //Player factory function
const player = ((name, symbol) => {
  return { name, symbol };
});

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

        //Game controller module
const gameController = (() => {
  let currentPlayer = player1;
  let gameActive = true;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkForWinner = () => {
    const winPatterns = [
      // Rows
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      // Columns
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      // Diagonals 
      [0, 4, 8], [2, 4, 6] 
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard.getBoard()[a] &&
        gameBoard.getBoard()[a] === gameBoard.getBoard()[b] &&
        gameBoard.getBoard()[a] === gameBoard.getBoard()[c]) {
        return true;
      }
    }

    return false;
  };

  const checkForTie = () => !gameBoard.getBoard().includes("");

  const endGame = () => {
    gameActive = false;
  };

  const isGameActive = () => {
    console.log(gameActive);
    return gameActive};

  return {
    switchPlayer,
    checkForWinner,
    checkForTie,
    endGame,
    isGameActive,
    get currentPlayer() { return currentPlayer; }
  };
})();

      //Function to start the game
function startGame() {
   
   const cells = document.querySelectorAll('.cell');
   cells.forEach((cell) => {
     cell.removeEventListener('click', handleCellClick);
   });
 

   cells.forEach((cell, index) => {
     cell.addEventListener('click', () => handleCellClick(index));
   });
 
}

      //Function to handle cell click
function handleCellClick(index) {
  console.log(gameController);
  if (gameController.isGameActive() && gameBoard.markCell(index, gameController.currentPlayer.symbol)) {
    updateUI();
    
    if (gameController.checkForWinner()) {
      console.log(`${gameController.currentPlayer.name} wins!`);
      gameController.endGame();
    } else if (gameController.checkForTie()) {
      console.log("It's a tie!");
      gameController.endGame();
    } else {
      gameController.switchPlayer();
    }
  }
}

        //Function to update the UI
function updateUI() {
  const cells = document.querySelectorAll('.cell');
  const board = gameBoard.getBoard();

  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

          //Reset the game
function resetGame() {
  gameBoard.resetBoard();
  gameController.currentPlayer = player1;
  gameController.gameActive = true;
  updateUI();
  startGame();
}