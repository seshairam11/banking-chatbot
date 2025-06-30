const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const connectDatabase = require('./config/connectDatabase');
const validateAccess = require("./router/validateAccess");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// Initialize the Express app
const app = express();

// Connect to the database
connectDatabase();

// Middleware for JSON parsing and CORS handling
app.use(express.json());
app.use(cors({
    origin: 'exp://192.168.29.230:8081',
    credentials: true,
}));

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
    cors: {
        origin: 'exp://192.168.29.230:8081',
        credentials: true,
    },
});

// Use API routes
app.use('/api/v1/', validateAccess);

// Import the validateUserAccess function (for Socket.IO)


// Handle Socket.io connections
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);



    // Handle disconnect event
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Start the server
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
