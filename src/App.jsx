import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../src/winnig-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  x: "Player 1",
  o: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  // Determines whose turn it is based on the last move
  let currentPlayer = "x";
  if (gameTurns.length > 0 && gameTurns[0].player === "x") {
    currentPlayer = "o";
  }
  return currentPlayer;
}

function derivedWinner(gameBoard, players) {
  // Checks the board for a winning combination
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSqrSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSqrSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSqrSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSqrSymbol &&
      firstSqrSymbol === secondSqrSymbol &&
      firstSqrSymbol === thirdSqrSymbol
    ) {
      winner = players[firstSqrSymbol];
    }
  }

  return winner;
}

function derivedGameBoard(gameTurns) {
  // Reconstructs the game board based on all turns so far
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  const isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // Updates game state with new turn, immutably adding to the start of the array

    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    // Resets game state to start a new game
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol
          id="players"
          className="highlight-player">
          <Player
            initialName={PLAYERS.x}
            symbol="x"
            isActive={activePlayer === "x"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.o}
            symbol="o"
            isActive={activePlayer === "o"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver
            winner={winner}
            onRestart={handleRestart}
          />
        )}

        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
