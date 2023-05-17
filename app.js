
require('./init');


const express = require("express");
const router = require("./routes");
const cors = require("cors");
const cookiParser = require("cookie-parser")
const errorMiddleware = require("./middlewares/error.middleware");
const expressErrorMiddleware = require("./middlewares/expressError.middleware");
const app = express();

const PORT = process.env.PORT;

require("./db");

app
    .use(cors())
    .use(express.json())
    .use(cookiParser())
    .use("/", router)
    .use(expressErrorMiddleware())
    .listen(PORT, () => {
        console.log("server start at port:", PORT);
    });


