# Chess_Dot_Com 

This project is a real-time multiplayer chess game that allows players to connect and play chess in their browser. The game supports two players, one playing as white and the other as black, while additional users can join as spectators to observe the match. The game uses Socket.IO for real-time communication between the players and spectators and Chess.js for game logic, move validation, and FEN board state management.

## Features

- **Real-time Gameplay**: Moves are instantly updated for all connected clients using WebSockets.
- **Player Roles**: Automatically assigns players as white or black based on availability, with others joining as spectators.
- **Drag-and-Drop Interface**: Intuitive drag-and-drop functionality for moving pieces on the chessboard.
- **Role-based Validation**: Ensures only the active player can make moves based on their role.
- **Spectator Mode**: Allows additional users to watch the game without interfering with gameplay.
- **Automatic Move Broadcasting**: All moves are broadcast to connected clients, keeping the board synchronized.

**[Visit the website](https://chess-dot-com-3.onrender.com/)**

## Technologies Used

### Frontend:
- Vanilla JavaScript
- HTML/CSS
- Drag-and-drop functionality for the chessboard

### Backend:
- **Node.js**: Server-side runtime environment
- **Express.js**: Web framework for handling HTTP requests
- **Socket.IO**: Real-time communication between server and clients
- **Chess.js**: Chess logic library for move validation and board state management

### Templating:
- **EJS (Embedded JavaScript)**: Dynamic rendering of the game's user interface

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/f0be7c1b-ae99-4abb-a902-1e565cbf4b32" alt="Screenshot 1" width="45%" height="60%">
  <img src="https://github.com/user-attachments/assets/c72baded-8f58-4c32-9276-9f5c7f05ffee" alt="Screenshot 2" width="45%">
</p>
