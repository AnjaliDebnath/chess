import React from "react";
import useChessboard from "../hooks/useChessBoard";
import "./Board.css";

const Chessboard = () => {
  const {
    board,
    turn,
    selectedSquare,
    predictedMoves,
    handleSquareClick,
    gameOver,
    winner,
    resetGame,
    
  } = useChessboard();

  return (
    <div className="header-container">
      <h1 className="chess-master-title">CHESS MASTER</h1>
      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>{winner} Wins!</p>
        </div>
      ) : (
        <div className="turn-box">
          <h2>Turn :{turn.charAt(0).toUpperCase() + turn.slice(1)}</h2>
        </div>
      )}
      <button onClick={resetGame} className="reset-button">Reset Game</button>

      <div className="chessboard">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;

            const isSelected =
              selectedSquare &&
              selectedSquare[0] === rowIndex &&
              selectedSquare[1] === colIndex;

            const isPredicted = predictedMoves.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`square ${isWhiteSquare ? "white" : "black"} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && <span className="piece">{piece}</span>}
                {isPredicted && <div className="predicted-dot" />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Chessboard;
