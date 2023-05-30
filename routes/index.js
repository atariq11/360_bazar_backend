const express = require('express');
const router = express.Router();


const authenticationMiddleware = require("../middlewares/authentication.middleware");

const auth = require('./auth.router');
const users = require('./users.router');
const promoCodes = require('./promoCodes.router');
const rolesCodes = require('./roles.router');


router.use('/auth', auth);
router.use('/users', authenticationMiddleware(), users);
router.use('/roles', rolesCodes); //authenticationMiddleware(), 
router.use('/promo-codes', authenticationMiddleware(), promoCodes);

//livechat


const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:9786",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});

module.exports = router;
