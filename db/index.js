const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const DB_CON_URL = process.env.DB_CON_URL;

mongoose.connect(DB_CON_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DataBase Connected")).catch((errr) => {
    console.log(errr);
})
