// utils/moveValidation.js
export const isValidMove = (piece, start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
  
    if (!piece) return false;
  
    const rowDiff = Math.abs(startRow - endRow);
    const colDiff = Math.abs(startCol - endCol);
  
    switch (piece) {
      case "♙": // White Pawn
        return validatePawnMove(start, end, board, "white");
      case "♟": // Black Pawn
        return validatePawnMove(start, end, board, "black");
      case "♖":
      case "♜": // Rook
        return validateRookMove(start, end, board);
      case "♘":
      case "♞": // Knight
        return rowDiff * colDiff === 2;
      case "♗":
      case "♝": // Bishop
        return validateBishopMove(start, end, board);
      case "♕":
      case "♛": // Queen
        return validateRookMove(start, end, board) || validateBishopMove(start, end, board);
      case "♔":
      case "♚": // King
        return rowDiff <= 1 && colDiff <= 1;
      default:
        return false;
    }
  };
  
  const validatePawnMove = (start, end, board, color) => {
    const direction = color === "white" ? -1 : 1;
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
    const rowDiff = endRow - startRow;
  
    // Moving forward
    if (endCol === startCol && board[endRow][endCol] === null) {
      return (
        rowDiff === direction || // Single step
        (rowDiff === 2 * direction && // Double step from starting position
          ((color === "white" && startRow === 6) || (color === "black" && startRow === 1)))
      );
    }
  
    // Capturing diagonally
    if (
      Math.abs(endCol - startCol) === 1 &&
      rowDiff === direction &&
      board[endRow][endCol] !== null
    ) {
      return true;
    }
  
    return false;
  };
  
  const validateRookMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
  
    if (startRow !== endRow && startCol !== endCol) return false;
  
    // Check if path is clear
    const direction = startRow === endRow ? "horizontal" : "vertical";
    const min = direction === "horizontal" ? Math.min(startCol, endCol) : Math.min(startRow, endRow);
    const max = direction === "horizontal" ? Math.max(startCol, endCol) : Math.max(startRow, endRow);
  
    for (let i = min + 1; i < max; i++) {
      if (direction === "horizontal" && board[startRow][i] !== null) return false;
      if (direction === "vertical" && board[i][startCol] !== null) return false;
    }
  
    return true;
  };
  
  const validateBishopMove = (start, end, board) => {
    const [startRow, startCol] = start;
    const [endRow, endCol] = end;
  
    if (Math.abs(startRow - endRow) !== Math.abs(startCol - endCol)) return false;
  
    // Check if path is clear
    const rowDirection = startRow < endRow ? 1 : -1;
    const colDirection = startCol < endCol ? 1 : -1;
  
    let row = startRow + rowDirection;
    let col = startCol + colDirection;
  
    while (row !== endRow && col !== endCol) {
      if (board[row][col] !== null) return false;
      row += rowDirection;
      col += colDirection;
    }
  
    return true;
  };
  