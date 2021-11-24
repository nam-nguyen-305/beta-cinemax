const Movie = require('../models/Movies');
const Room = require('../models/cinemaRoom');
const Showtime = require("../models/showtime");
const { mongooseToObject } = require("../../util/mongoose");
class movieController {
  // [GET] /movies/:slug
  show(req, res, next) {
    const callMovie = Movie.findOne({ slug: req.params.slug });
    const callShowtime= Showtime.find({}).lean();
    const callRoom = Room.find({}).lean();
    Promise.all([callMovie,callShowtime,callRoom]).then(([movie, showtime, room])=> {
      res.render("movies/show", {
        movie: mongooseToObject(movie),
        showtime,
        room
      })
      console.log(room[0].rows * room[0].cols)
    })
    .catch(next);
      
  }
  //[GET] /courses/create
  create(req, res, next) {
    res.render("movies/create");
  }
  //[POST] /courses/create
  store(req, res, next) {
    const movie = new Movie(req.body);
    movie
      .save()
      .then(() => res.redirect("/me/stored/movies"))
      .catch((err) => {});
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    Movie.findById(req.params.id)
      .then((movie) =>
        res.render("movies/edit", {
          movie: mongooseToObject(movie),
        })
      )
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Movie.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.redirect("/me/stored/movies")
    ).catch;
  }
  destroy(req, res, next) {
    Movie.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Movie.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Movie.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
  }
}

module.exports = new movieController();
