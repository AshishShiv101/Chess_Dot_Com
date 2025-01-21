const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null; // 'w' for white, 'b' for black, or null for spectator

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            const isLightSquare = (rowIndex + squareIndex) % 2 === 0;

            squareElement.classList.add(
                "square",
                isLightSquare ? "light" : "dark"
            );

            // Flip the board for the black player
            const displayRow = playerRole === 'b' ? 7 - rowIndex : rowIndex;
            const displayCol = playerRole === 'b' ? 7 - squareIndex : squareIndex;

            squareElement.dataset.row = displayRow;
            squareElement.dataset.col = displayCol;

            const piece = board[displayRow][displayCol];
            if (piece) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    piece.color === 'w' ? "white" : "black"
                );
                pieceElement.innerText = getPieceUnicode(piece);
                pieceElement.draggable = playerRole === piece.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: displayRow, col: displayCol };
                        e.dataTransfer.setData("text/plain", ""); // Required for drag and drop
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault(); // Allows dropping
            });

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q', // Automatically promote to queen for simplicity
    };

    socket.emit("move", move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        p: "♟", // Black Pawn
        r: "♜", // Black Rook
        n: "♞", // Black Knight
        b: "♝", // Black Bishop
        q: "♛", // Black Queen
        k: "♚", // Black King
        P: "♙", // White Pawn
        R: "♖", // White Rook
        N: "♘", // White Knight
        B: "♗", // White Bishop
        Q: "♕", // White Queen
        K: "♔", // White King
    };
    return unicodePieces[piece.type] || "";
};

// Handle player roles
socket.on("playerRole", function (role) {
    playerRole = role;
    renderBoard();
});

// Handle spectator role
socket.on("spectatorRole", function () {
    playerRole = null; // Spectators cannot interact
    renderBoard();
});

// Sync board state from the server
socket.on("boardState", function (fen) {
    chess.load(fen);
    renderBoard();
});

// Handle moves from the server
socket.on("move", function (move) {
    chess.move(move);
    renderBoard();
});

// Render the initial empty board
renderBoard();
