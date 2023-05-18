const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({

    promoCodeId: {
        type: ObjectId,
        required: true
    },

    userId: {
        type: ObjectId,
        required: true
    }

}, {
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => delete ret._id }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
});

schema.virtual('promoCode', {
    ref: 'promoCodes', // the collection/model name
    localField: 'promoCodeId',
    foreignField: '_id',
    justOne: true, // default is false
});


schema.virtual('user', {
    ref: 'users', // the collection/model name
    localField: 'userId',
    foreignField: '_id',
    justOne: true, // default is false
});


schema.index({ code: 1, user: 1 }, { unique: true })

module.exports = mongoose.model("promoCodeRedeems", schema);


