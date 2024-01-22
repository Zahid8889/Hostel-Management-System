const mongoose = require("mongoose");

const { Schema } = mongoose.Schema;

const roomSchema = new Schema(
    {
        hostelno: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "hostel"

        },
        student: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "student"

        }
        , admin: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "admin"
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('room', roomSchema)
