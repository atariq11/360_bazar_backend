
require('./init');


const express = require("express");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const app = express();

const PORT = process.env.PORT;

require("./db");

app.use(cors());
app.use(express.json());
app.use(cookiParser());
app.use(router);

app.listen(PORT, () => {
    console.log("server start at port:", PORT);
});


