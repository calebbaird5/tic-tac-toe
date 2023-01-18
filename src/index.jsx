import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Square = (props) => {
  return (
    <button className="square" onClick={props.handleClick}>
      {props.value} </button>
  );
}

const Board = ({board, selectSquare}) => {
  return (
    <div className="board">
      {
        board.map((el, i) =>
          <Square key={i} value={board[i]} handleClick={() => selectSquare(i)} />
        )
      }
    </div>

  );
}

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [player, setPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkForGameEnd = (board) => {
    console.log('check for game end')
    console.log('board', board)
    const winningCombination = winningCombinations.find(combination =>
      board[combination[0]]
        && board[combination[0]] === board[combination[1]]
        && board[combination[0]] === board[combination[2]]
    );

    // If there is a winning combination on the board end the game and declare the winner.
    if (winningCombination) {
      setGameOver(true);
      setWinner(board[winningCombination[0]]);

      // If there is no winning combination but the board is full end the game.
    } else if (board.filter(el => el).length === 9) {
      setGameOver(true);
    }
  }

  const selectSquare = (index) => {
    if (!gameOver && !board[index]) {
      const newBoard = board.map((el, i) => i === index ? player : el);
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
      checkForGameEnd(newBoard);
    }
  };

  const displayNextPlayer = () => {
    return 'Next Player: ' + player;
  };

  const displayWinner = () => {
    if (gameOver) {
      if (winner) {
        return 'Winner: ' + winner;
      } else {
        return 'It is a tie';
      }
    }
    return '';
  };

  return (
    <div className="game">
      <div className="game-info">
        {gameOver ? displayWinner() : displayNextPlayer()}
      </div>
      <div className="game-board">
        <Board board={board} selectSquare={selectSquare}  />
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
