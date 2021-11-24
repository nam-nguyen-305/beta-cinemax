const Movie = require('../models/Movies');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class SiteController {
    // [GET] /news
    index(req, res, next) {
        Movie.find({})
            .then((movies) => {
                res.render('home', {
                    movies: mutipleMongooseToObject(movies),
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController();