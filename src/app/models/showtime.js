const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Showtime = new Schema(
    {
        day: {type: String, required: true},
        startAt: {type: String, required: true},
        endAt: {type: String, required: true},
        movie: {
            name: { type: String},
        },
        room: {
            name: { type: String},
            
        }
        // movieId: {type: Schema.Types.ObjectId, ref: 'Movie'},
        // roomId:  {type: Schema.Types.ObjectId, ref: 'Room'},
    },
    {
        timestamps: true,
    }
)
mongoose.plugin(slug);
Showtime.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
// Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Showtime", Showtime);