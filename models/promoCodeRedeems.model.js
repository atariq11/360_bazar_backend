const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({

    code: {
        type: ObjectId,
        required: true,
        ref: "promoCodes"
    },

    user: {
        type: ObjectId,
        required: true,
        ref: "users"
    }

});

schema.index({ code: 1, user: 1 }, { unique: true })

module.exports = mongoose.model("promoCodeRedeems", schema);


