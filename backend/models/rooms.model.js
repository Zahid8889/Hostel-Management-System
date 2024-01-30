const mongoose = require("mongoose");

const { Schema } = mongoose;

const roomSchema = new Schema(
    {
        hostelid: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "hostel",
            index: true,

        },
        roomNumber: {
            type: Number,
            required: true,
            index: true,
        },
        capacity: {
            type: Number,
            required: true
        }

    }
    ,
    {
        timestamps: true,
    }
);
roomSchema.index({ hostelid: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model('room', roomSchema)
