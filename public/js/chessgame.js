const socket = io();
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');


let draggedPiece = null;
let sourceSquare =  null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex)=>{
        row.forEach((square,squareindex)=>{
            const squareELement = document.createElement("div");
            squareELement.classList.add("square",
                (rowindex + squareindex)%2 ===0 ? "light" : "dark"
            )
        })
    })

}
const handleMove = () => {}
const getPiece = () => {}