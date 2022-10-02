require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const route = require("./routes");
const PORT = process.env.PORT || 5000

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://hoangbao020103:baobaobao@cluster0.oa0er2c.mongodb.net/?retryWrites=true&w=majority`
            // `mongodb://localhost:27017`
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connect");
    } catch (error) {
        console.log(error.message);
    }
};

app.use(cors());
connectDB();
route(app);

app.listen(PORT, () => {
    console.log(`Example add listening as http://localhost:${PORT} `);
});
