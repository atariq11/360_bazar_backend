const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;
const schema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: ObjectId,
        required: true,
        ref: "roles"
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }

});

schema.pre(["save", "updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next()

});

module.exports = mongoose.model("users", schema);


