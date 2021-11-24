const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');


const Movie = new Schema(
    {
        name: { type: String, required: true },
        img: { type: String, required: true},
        time: {type: String, require: true},
        ageLimit: {type: String, require: true},
        releaseDay: {type: String, require: true},
        language: {type: String, require: true},
        actor: {type: String, require: true},
        director: {type: String, required: true},
        country: {type: String, required: true},
        summary: {type: String, required: true},
        status: {type: String, required: true},
        category: {type: String, required: true},
        slug: { type: String, slug: 'name', unique: 'true' },
        trailerId: {type: String, required: true},
    },
    {
        timestamps: true,
    },
);
mongoose.plugin(slug);
Movie.plugin(mongooseDelete,{deletedAt: true, overrideMethods: 'all' });
// Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
module.exports = mongoose.model("Movie", Movie);
