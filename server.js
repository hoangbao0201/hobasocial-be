require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./routes");
const PORT = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

// socket
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://hoangbao-social-network.vercel.app",
        ],
    },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.dgng6cd.mongodb.net/?retryWrites=true&w=majority`,
            // `mongodb://localhost:27017`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Mongodb connect");
    } catch (error) {
        console.log(error.message);
    }
};

connectDB();
route(app);

global.onlineUser = new Map();
io.on("connection", (socket) => {

    global.chatSocket = socket;

    socket.on("add-user", (userId) => {
        onlineUser.set(userId, socket.id);
    })

    socket.on("send-message", (newMessage) => {
        socket.broadcast.emit("msg-receive", newMessage);
    });
    
});

server.listen(PORT, () => {
    console.log(`Example add listening as http://localhost:${PORT} `);
});
