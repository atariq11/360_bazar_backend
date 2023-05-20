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
        required: true,
        unique: true
    }

}, {
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret._id; return ret } },
    toObject: { virtuals: true }
});


schema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});


module.exports = mongoose.model("promoCodes", schema);


