const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require("../util/auth");


const movieController = require('../app/controllers/movieController');

//movieController.index
router.get('/create', auth, movieController.create);
router.post('/store', auth, movieController.store);
router.get('/:id/edit', auth, movieController.edit);
router.put('/:id', auth, movieController.update);
router.delete('/:id', auth, movieController.destroy);
router.delete('/:id/force', auth, movieController.forceDestroy);
router.patch('/:id/restore', auth, movieController.restore);
router.get('/:slug', auth, movieController.show);

module.exports = router;
