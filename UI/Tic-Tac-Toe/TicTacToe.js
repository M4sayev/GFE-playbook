import { useState } from "react";

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

function checkForWinner(board) {
  for (const comb of winningCombinations) {
    const [a, b, c] = comb;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return { success: true, comb };
    }
  }
  return { success: false };
}

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState("");
  const [winningComb, setWinningComb] = useState(null);
  const turn = currentMove % 2 === 0 ? "X" : "O";

  function makeAMove(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;

    setBoard(newBoard);

    const res = checkForWinner(newBoard);
    if (res.success) {
      setWinner(turn);
      setWinningComb(res.comb);
    }
    setCurrentMove((prev) => prev + 1);
  }

  function resetBoard() {
    setBoard(Array(9).fill(null));
    setCurrentMove(0);
    setWinner(null);
    setWinningComb("");
  }

  const isDraw = currentMove === 9 && !winner;
  const announcement = isDraw
    ? "Draw!!!"
    : winner
      ? `Player ${winner} won!!!`
      : `Player ${turn}'s turn`;

  return (
    <div className="tic-tac-toe">
      <div aria-live="polite" aria-atomic="true" className="turn-announcer">
        {announcement}
      </div>

      <div className="board">
        {board.map((move, i) => {
          const isPressed = board[i] !== null;
          const label = isPressed ? "" : "Press the box";
          return (
            <button
              key={i}
              disabled={winner || isPressed}
              aria-pressed={isPressed}
              aria-label={label}
              className={`board__button ${winningComb && winningComb.includes(i) ? "winning" : ""}`}
              onClick={() => makeAMove(i)}
            >
              {move}
            </button>
          );
        })}
      </div>

      <button onClick={resetBoard} className="reset-btn">
        Reset
      </button>
    </div>
  );
}
