const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Render the index.html file
app.get("/", (req, res) => {
    res.render("index", { title: "Chess Game" });
});

// Socket.IO logic
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Assign player roles or spectator role
    if (!players.white) {
        players.white = socket.id;
        socket.emit("playerRole", "w");
    } else if (!players.black) {
        players.black = socket.id;
        socket.emit("playerRole", "b");
    } else {
        socket.emit("spectatorRole");
    }

    // Send the initial board state
    socket.emit("boardState", chess.fen());

    // Handle player disconnection
    socket.on("disconnect", () => {
        if (socket.id === players.white) delete players.white;
        else if (socket.id === players.black) delete players.black;
    });

    // Handle player moves
    socket.on("move", (move) => {
        try {
            // Validate the move based on player roles
            if (chess.turn() === "w" && socket.id !== players.white) return;
            if (chess.turn() === "b" && socket.id !== players.black) return;

            const result = chess.move(move);
            if (result) {
                // Broadcast the move and updated board state
                io.emit("move", move);
                io.emit("boardState", chess.fen());
            } else {
                socket.emit("invalidMove", move);
            }
        } catch (err) {
            console.error("Error processing move:", err);
            socket.emit("invalidMove", move);
        }
    });
});

// Start the server
server.listen(3000, () => {
    console.log("Server started on port 3000");
});
