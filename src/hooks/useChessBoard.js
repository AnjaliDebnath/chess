import { useState } from "react";
import { isValidMove } from "../utils/moveValidation";

const useChessboard = () => {
  const initialBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [turn, setTurn] = useState("white");

  const isPieceBelongsToPlayer = (piece) => {
    if (!piece) return false;
    return turn === "white"
      ? "♙♖♘♗♕♔".includes(piece)
      : "♟♜♞♝♛♚".includes(piece);
  };

  const handleSquareClick = (row, col) => {
    if (selectedSquare) {
      const [prevRow, prevCol] = selectedSquare;
      const piece = board[prevRow][prevCol];

      if (isValidMove(piece, [prevRow, prevCol], [row, col], board)) {
        const newBoard = board.map((r, i) =>
          r.map((c, j) => {
            if (i === row && j === col) return piece; // Move piece
            if (i === prevRow && j === prevCol) return null; // Clear previous square
            return c;
          })
        );
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white"); // Switch turn
      }
      setSelectedSquare(null);
    } else if (isPieceBelongsToPlayer(board[row][col])) {
      setSelectedSquare([row, col]);
    }
  };

  return {
    board,
    turn,
    selectedSquare,
    handleSquareClick,
  };
};

export default useChessboard;
