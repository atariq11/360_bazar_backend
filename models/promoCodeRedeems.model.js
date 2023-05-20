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
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret._id; return ret } },
    toObject: { virtuals: true }
});

schema.virtual('promoCode', {
    ref: 'promoCodes',
    localField: 'promoCodeId',
    foreignField: '_id',
    justOne: true,
});


schema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});


schema.index({ code: 1, user: 1 }, { unique: true })

module.exports = mongoose.model("promoCodeRedeems", schema);


