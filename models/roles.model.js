const mongoose = require("mongoose");

const schema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },

    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }

});

module.exports = mongoose.model("roles", schema);

