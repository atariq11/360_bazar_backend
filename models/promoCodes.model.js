const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    userId: {
        type: ObjectId,
        required: true
    }

}, {
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => delete ret._id }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});


schema.virtual('user', {
    ref: 'users', // the collection/model name
    localField: 'userId',
    foreignField: '_id',
    justOne: true, // default is false
});


module.exports = mongoose.model("promoCodes", schema);


