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
  const [predictedMoves, setPredictedMoves] = useState([]);
  const [turn, setTurn] = useState("white");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const resetGame=()=>{
    setBoard(initialBoard);
    setSelectedSquare(null);
    setPredictedMoves([]);
    setTurn("white");
    setGameOver(false);
    setWinner(null);
  };

  const isPieceBelongsToPlayer = (piece) => {
    if (!piece) return false;
    return turn === "white"
      ? "♙♖♘♗♕♔".includes(piece)
      : "♟♜♞♝♛♚".includes(piece);
  };

  const calculateValidMoves = (row, col, piece) => {
    const moves = [];
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isValidMove(piece, [row, col], [r, c], board)) {
          moves.push([r, c]);
        }
      }
    }
    return moves;
  };

  const handleSquareClick = (row, col) => {
    if (gameOver) return;

    const piece = board[row][col];

    if (selectedSquare) {
      const [prevRow, prevCol] = selectedSquare;
      const selectedPiece = board[prevRow][prevCol];

      if (isValidMove(selectedPiece, [prevRow, prevCol], [row, col], board)) {
        const newBoard = board.map((r, i) =>
          r.map((c, j) => {
            if (i === row && j === col) {
              if (c === "♔" || c === "♚") {
                setGameOver(true);
                setWinner(c === "♔" ? "Black" : "White");
              }
              return selectedPiece;
            }
            if (i === prevRow && j === prevCol) return null; // Clear previous square
            return c;
          })
        );
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white"); // Switch turn
      }
      setSelectedSquare(null);
      setPredictedMoves([]);
    } else if (isPieceBelongsToPlayer(piece)) {
      setSelectedSquare([row, col]);
      setPredictedMoves(calculateValidMoves(row, col, piece));
    } else {
      setSelectedSquare(null);
      setPredictedMoves([]);
    }
  };

  return {
    board,
    turn,
    selectedSquare,
    handleSquareClick,
    predictedMoves,
    gameOver,
    winner,
    resetGame
  };
};

export default useChessboard;
