const btoa = require("btoa");
const atob = require("atob");

class ShortUrl {
    constructor(id, encodedOriginalUrl, t_created) {
        this.id = id;
        this.encodedOriginalUrl = encodedOriginalUrl;
        this.t_created = t_created;
        this.setShortenedPath(this.generateShortenedPath())
    }

    getEncodedOriginalUrl(){
        return this.encodedOriginalUrl;
    }

    getId(){
        return this.id;
    }

    getCreatedAt(){
        return this.t_created;
    }

    getCreatedAtHumanTime(){
        return new Date(this.getCreatedAt()).toDateString();
    }
    
    getShortenedPath(shortenedUrl){
        return this.shortenedUrl;
    }

    setShortenedPath(shortenedUrl){
        this.shortenedUrl= shortenedUrl;
    }

    generateShortenedPath(){
        return `${generateRandomHex(8)}`;
    }
}


const findByPath = async (path) => {
    return await new Promise((resolve, reject) => {
        const shortenedUrl = localStorage.find((el) => el.getShortenedPath() === path);
        if (shortenedUrl){
            const decodedOriginalUrl = atob(shortenedUrl.getEncodedOriginalUrl());
            resolve(decodedOriginalUrl);
        } else {
            reject({error: "Not Found"})
        }
    });
}

const findById = async (id) => {
    return await new Promise((resolve, reject) => {
        const shortenedUrl = localStorage.find((el) => el.getId() === id);
        if (shortenedUrl){
            resolve(shortenedUrl);
        } else {
            reject({error: "Not Found"})
        }
    });
}


const createShortUrl = async (originalUrl) => {
    return await new Promise((resolve, reject) => {
        try {
            const id = generateRandomHex(32);
            const encodedOriginalUrl = btoa(originalUrl);
            const shortUrlInstance = new ShortUrl(id, encodedOriginalUrl, new Date().getTime())
            localStorage.push(shortUrlInstance);
            resolve(shortUrlInstance);
        } catch (err){
            reject({error: "Error creating short url"})
        }
    });
}

const deleteShortUrl = async (id) => {
    return await findById(id)
        .then((resp) => localStorage.splice(localStorage.indexOf(resp), 1))
        .catch((err) => { throw({error: "Error deleting short url"}) });
}


const getAllShortenedUrls = async () => {
    return await new Promise((resolve, reject) => {
        try {
            const resp = localStorage.map((x) => {
                return {                    
                    humanTime: x.getCreatedAtHumanTime(),
                    shortenedPath: x.getShortenedPath(),
                    id: x.getId(),
                    decodedOriginalUrl: atob(x.getEncodedOriginalUrl())
                }
            })
            resolve(resp);
        } catch (err){
            reject({error: "Error creating short url"})
        }
    });
}

const generateRandomHex = (len) => {
    const maxlen = 8,
        min = Math.pow(16,Math.min(len,maxlen)-1) 
        max = Math.pow(16,Math.min(len,maxlen)) - 1,
        n   = Math.floor( Math.random() * (max-min+1) ) + min;

    let r = n.toString(16);

    while ( r.length < len ) {
       r = r + generateRandomHex( len - maxlen );
    }
    return r;
};

module.exports = {
    findById,
    createShortUrl,
    deleteShortUrl,
    getAllShortenedUrls,
    findByPath
}