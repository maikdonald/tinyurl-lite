const express = require('express');
const controller = require('../../controllers/controller');

const router = express.Router();

router.get('/:shortenedUrl', controller.navigateToShortenedUrl);


module.exports = router;