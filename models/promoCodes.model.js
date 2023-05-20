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
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => delete ret._id },
    toObject: { virtuals: true }
});


schema.virtual('user', {
    ref: 'users',
    localField: 'userId',
    foreignField: '_id',
    justOne: true,
});


module.exports = mongoose.model("promoCodes", schema);


