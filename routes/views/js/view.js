const model = require('../../../models/model')


const getAndBuildLatestShortened = (req, shortened_urls) => {
    const latest_shortened = shortened_urls[shortened_urls.length-1];
    const relUrl = `/navigate/${latest_shortened.shortenedPath}`;
    
    return {...latest_shortened,
        relUrl,
        fullUrl: `${req.protocol}://${req.hostname}:${req.socket.localPort}${relUrl}`,
    }
}

exports.render = async (req, res) => {
    const shortened_urls = await model.getAllShortenedUrls();
    let shortened_urls_vals =[];
    let previous_url, full_url, latest_shortened;
    
    if (shortened_urls.length>0){
        latest_shortened = getAndBuildLatestShortened(req, shortened_urls);
        shortened_urls_vals = shortened_urls.map(x => {
            delete x["decodedOriginalUrl"]
            return Object.values(x)
        });
    }
    
    res.render("view", {
        end_point: "/api/create",
        shortened_urls_vals,
        latest_shortened
    });
}