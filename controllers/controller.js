
const model = require('../models/model');

const createShortUrl = async (req, res) => {
    const originalUrl = req.body && req.body.original_url;
    await model.createShortUrl(originalUrl)
        .then((resp) => {
            res.redirect("/", 301);
        }).catch((err) => {
            res.redirect("/error", 301);
        });
};

const deleteShortUrl = async (req, res) => {
    const id = req.params.shortenedUrlId;
    await model.deleteShortUrl(id)
        .then((resp) => {
            res.redirect('/', 301);
        }).catch((err) => {
            res.redirect("/error", 301);
        });
};

const getAllShortenedUrls = async (req, res) => {
    await model.getAllShortenedUrls()
        .then((resp) => {
            res.status(200).send(resp);
        }).catch((err) => {
            res.status(500).send(err);
        });
};

const navigateToShortenedUrl = async (req, res) => {
    const shortenedUrl = req.params.shortenedUrl;
    await model.findByPath(shortenedUrl)
        .then((originalUrl) => {
            res.redirect(originalUrl, 301);
        }).catch((err) => {
            res.redirect("/error", 301);
        });
};

module.exports = {
    createShortUrl,
    deleteShortUrl,
    getAllShortenedUrls,
    navigateToShortenedUrl
}