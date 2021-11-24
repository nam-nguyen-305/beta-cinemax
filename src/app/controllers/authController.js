const Register = require("../models/registers");
const jwt = require("jsonwebtoken");

const handleErrors = require("handle-errors");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};
module.exports.signup_get = (req, res) => {
  res.render("register");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;
    if (password === cpassword) {
      const user = await Register.create(req.body);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({ user: user._id });
    } else {
      res.send("password is not matching");
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};
module.exports.login_post = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await Register.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).redirect('/');
  } catch (error) {
    res.status(400).json({});
  }
};
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", '', {maxAge:1});
  res.redirect('/');
};
