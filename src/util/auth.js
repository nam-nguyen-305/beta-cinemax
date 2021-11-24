const jwt = require("jsonwebtoken");
const Register = require("../app/models/registers");

// const auth = (req, res, next) => {
//   const token = req.cookies.jwt;

//   // check json web token exists & is verified
//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
//       if (err) {
//         console.log(err.message);
//         res.redirect("/login");
//       } else {
//         console.log(decodedToken);
//         next();
//       }
//     });
//   } else {
//     res.redirect("/login");
//   }
// };

const auth = async function (req, res, next) {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    console.log("this" + verifyUser);
    const user = await Register.findOne({ _id: verifyUser._id });
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};
// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await Register.findById(decodedToken.id);
        res.locals.user = user;
        res.locals.fullname= user.fullname;
        res.locals.role = user.role;
        
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { auth, checkUser };
