const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Seat = new Schema(
    {
        name: { type: String, required: true },
        row: {type: String, required: true},
        col: {type: String, required: true},
        status: {type: Boolean, required: true},
        roomId: [
            {type: Schema.Types.ObjectId, ref: 'Room'},
        ],
        seatType: {type: String, required: true},
    }
)
mongoose.plugin(slug);
Seat.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Seat", Seat);