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

}, {
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => delete ret._id }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});


module.exports = mongoose.model("roles", schema);


