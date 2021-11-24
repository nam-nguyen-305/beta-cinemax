const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Room = new Schema(
    {
        name: { type: String, required: true, unique: true},
        rows: {type: Number, required: true},
        cols: {type: Number, required: true}
    }
)
mongoose.plugin(slug);
Room.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
// Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Room", Room);