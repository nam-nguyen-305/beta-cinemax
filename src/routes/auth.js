const express = require('express');
const route = require('.');
const router = express.Router();
const authController = require('../app/controllers/authController');

router.get("/register", authController.signup_get);
router.post("/register", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);

module.exports = router;
