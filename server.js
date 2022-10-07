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
            `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.oa0er2c.mongodb.net/?retryWrites=true&w=majority`,
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

io.on("connection", (socket) => {
    console.log(socket.id);

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

server.listen(PORT, () => {
    console.log(`Example add listening as http://localhost:${PORT} `);
});
