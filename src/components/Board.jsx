// Chessboard.js
import React from "react";
import useChessboard from "../hooks/useChessBoard";
import "./Board.css";

const Chessboard = () => {
  const { board, turn, selectedSquare, handleSquareClick } = useChessboard();
  console.log(turn);
  return (
    <div>
        
      <h1>Turn: {turn.charAt(0).toUpperCase() + turn.slice(1)}</h1>
      <div className="chessboard">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const isWhiteSquare = (rowIndex + colIndex) % 2 === 0;
            const isSelected =
              selectedSquare &&
              selectedSquare[0] === rowIndex &&
              selectedSquare[1] === colIndex;
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`square ${isWhiteSquare ? "white" : "black"} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleSquareClick(rowIndex, colIndex)}
              >
                {piece && <span className="piece">{piece}</span>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Chessboard;
