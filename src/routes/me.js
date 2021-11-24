const express = require('express');
const route = require('.');
const router = express.Router();

const meController = require('../app/controllers/meController');

router.get('/stored/movies', meController.storedMovies);
router.get('/trash/movies', meController.trashMovies);

router.get('/stored/rooms', meController.storedRooms);
router.get('/trash/rooms', meController.trashRooms);

router.get('/stored/showtimes', meController.storedShowtimes);
router.get('/trash/showtimes', meController.trashShowtimes);
module.exports = router;
