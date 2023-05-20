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
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => delete ret._id },
    toObject: { virtuals: true }
});


module.exports = mongoose.model("roles", schema);


