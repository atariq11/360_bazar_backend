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

    roleId: {
        type: ObjectId,
        required: true
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

}, {
    toJSON: { virtuals: true, versionKey: false, transform: (doc, ret) => { delete ret._id; return ret } },
    toObject: { virtuals: true }
});
//, versionKey: false, transform: (doc, ret) => delete ret._id

schema.virtual('role', {
    ref: 'roles',
    localField: 'roleId',
    foreignField: '_id',
    justOne: true,
});

schema.pre("save", async function (next) {
    if ((this.isModified && this.isModified("password"))) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next()
});

schema.pre(["updateOne", "findByIdAndUpdate", "findOneAndUpdate"], async function (next) {
    const data = this.getUpdate();
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 12);
    }
    next()
});

module.exports = mongoose.model("users", schema);


