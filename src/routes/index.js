const newsRouter = require("./news");
const meRouter = require("./me");
const movieRouter = require("./movie");
const roomRouter = require("./room");
const showRouter = require("./showtime");
const siteRouter = require("./site");
const authRouter = require("./auth");
const { auth, checkUser } = require("../util/auth");

function route(app) {
  app.get("*", checkUser)
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/movies",auth, movieRouter);
  app.use("/rooms",auth, roomRouter);
  app.use("/showtimes",auth, showRouter);
  app.use("/", siteRouter);
  app.use(authRouter);
  
}

module.exports = route;
