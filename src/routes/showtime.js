const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require("../util/auth");


const showtimeController = require('../app/controllers/showtimeController');

//movieController.index
router.get('/create', auth, showtimeController.create);
router.post('/store', auth, showtimeController.store);
router.get('/:id/edit', auth, showtimeController.edit);
router.put('/:id', auth, showtimeController.update);
router.delete('/:id', auth, showtimeController.destroy);
router.delete('/:id/force', auth, showtimeController.forceDestroy);
router.patch('/:id/restore', auth, showtimeController.restore);
// router.get('/:slug', auth, roomController.show);

module.exports = router;