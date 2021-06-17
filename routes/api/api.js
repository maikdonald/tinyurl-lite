const express = require('express');
const controller = require('../../controllers/controller');

const router = express.Router();

router.post('/create', controller.createShortUrl);
router.get('/get-all-shortened-urls', controller.getAllShortenedUrls);
router.get('/delete/:shortenedUrlId', controller.deleteShortUrl);


module.exports = router;