const express = require('express');
const route = require('.');
const router = express.Router();
const { auth, checkUser } = require("../util/auth");


const roomController = require('../app/controllers/roomController');

//movieController.index
router.get('/create', auth, roomController.create);
router.post('/store', auth, roomController.store);
router.get('/:id/edit', auth, roomController.edit);
router.put('/:id', auth, roomController.update);
router.delete('/:id', auth, roomController.destroy);
router.delete('/:id/force', auth, roomController.forceDestroy);
router.patch('/:id/restore', auth, roomController.restore);
// router.get('/:slug', auth, roomController.show);

module.exports = router;