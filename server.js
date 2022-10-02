require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const route = require("./routes");
const PORT = 5000;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://hoangbao020103:baobaobao@cluster0.oa0er2c.mongodb.net/?retryWrites=true&w=majority`, {
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
