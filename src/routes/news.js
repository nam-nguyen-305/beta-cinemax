const express = require('express');
const route = require('.');
const router = express.Router();

const newsController = require('../app/controllers/newController');

//newsController.index

router.use('/', newsController.index);
router.use('/:slug', newsController.show);

module.exports = router;
