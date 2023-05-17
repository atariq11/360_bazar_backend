const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    user: {
        type: ObjectId,
        required: true,
        ref: "users"
    }

});

module.exports = mongoose.model("promoCodes", schema);


