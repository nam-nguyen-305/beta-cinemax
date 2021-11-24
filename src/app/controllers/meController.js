const Movie = require("../models/Movies");
const Room = require("../models/cinemaRoom");
const Showtime = require("../models/showtime");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const showtime = require("../models/showtime");

class meController {
  // [GET] /me/stored/movies
  storedMovies(req, res, next) {
    Promise.all([Movie.find({}), Movie.countDocumentsDeleted()])
      .then(([movies, deletedCount]) =>
        res.render("me/stored-movies", {
          deletedCount,
          movies: mutipleMongooseToObject(movies),
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/movies
  trashMovies(req, res, next) {
    Movie.findDeleted({})
      .then((movies) =>
        res.render("me/trash-movies", {
          movies: mutipleMongooseToObject(movies),
        })
      )
      .catch(next);
  }
  // ===============================================
  // ROOM
  storedRooms(req, res, next) {
    Promise.all([Room.find({}), Room.countDocumentsDeleted()])
      .then(([rooms, deletedCount]) =>
        res.render("me/stored-rooms", {
          deletedCount,
          rooms: mutipleMongooseToObject(rooms),
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/rooms
  trashRooms(req, res, next) {
    Room.findDeleted({})
      .then((rooms) =>
        res.render("me/trash-rooms", {
          rooms: mutipleMongooseToObject(rooms),
        })
      )
      .catch(next);
  }

  // ========================================================
  // SHOWTIME

  storedShowtimes(req, res, next) {
    Promise.all([Showtime.find({}).lean(), Showtime.countDocumentsDeleted()])
      .then(([Showtimes, deletedCount]) =>
        res.render("me/stored-showtimes", {
          deletedCount,
          Showtimes,
        })
      )
      .catch(next);
  }
  // [GET] /me/trash/showtimes
  trashShowtimes(req, res, next) {
    Showtime.findDeleted({}).lean()
      .then((Showtimes) =>
        res.render("me/trash-showtimes", {
          Showtimes
        })
      )
      .catch(next);
  }
}

module.exports = new meController();
