const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({

    full_name: {
        type: String,
        required: true,
        trim: true
    },

    role: {
        type: ObjectId,
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

userSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next()

});

module.exports = new mongoose.model("users", userSchema);;


