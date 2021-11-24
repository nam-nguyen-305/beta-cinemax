const Room = require("../models/cinemaRoom");
const { mongooseToObject } = require("../../util/mongoose");
class roomController {
  // [GET] /movies/:slug
  // show(req, res, next) {
  //   Room.findOne({ slug: req.params.slug })
  //     .then((room) =>
  //       res.render("movies/show", {
  //           room: mongooseToObject(room),
  //       })
  //     )
  //     .catch(next);
  // }
  //[GET] /courses/create
  create(req, res, next) {
    res.render("cinemaRoom/createRoom");
  }
  //[POST] /courses/create
  store(req, res, next) {
    const room = new Room(req.body);
    room
      .save()
      .then(() => res.redirect("/me/stored/rooms"))
      .catch((err) => {});
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    Room.findById(req.params.id)
      .then((room) =>
        res.render("cinemaRoom/editRoom", {
          room: mongooseToObject(room),
        })
      )
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Room.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.redirect("/me/stored/rooms")
    ).catch;
  }
  destroy(req, res, next) {
    Room.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  //[DELETE] /courses/:id/force
  forceDestroy(req, res, next) {
    Room.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Room.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
  }
}

module.exports = new roomController();
