const mongoose = require("mongoose").set("strictQuery", false);
const DB_CON_URL = "mongodb://root:Nopass$123@localhost:27017/360_bazar_db";


module.exports = mongoose.connect(DB_CON_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    authSource: "admin"
}).then(() => console.log("DataBase Connected")).catch((errr) => {
    console.log(errr);
})

const users = require('../models/users.model');
const roles = require('../models/roles.model');



async function main(params) {


    let foundRole = await roles.findOne({ code: "admin" })
    console.log("foundRole", foundRole)
    if (!foundRole) {

        foundRole = new roles({
            title: "Admin",
            code: "admin"
        });

        // here password hasing
        await foundRole.save();
    }


    let foundUser = await users.findOne({ email: "hamza@hamza.com" }).populate('role');
    console.log("foundUser", foundUser)
    if (!foundUser) {
        foundUser = new users({
            role: foundRole._id,
            fullName: "Hamza",
            email: "hamza@hamza.com",
            password: "nopass"
        });

        // here password hasing
        await foundUser.save();
    }
    console.log("done");
}

main();
