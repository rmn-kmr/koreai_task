let bitly = require('../helper/bitly');
let {isValidURL} = require('../helper/utils');
let shortUrl = (req, res) => {
    return new Promise(async(resolve, reject) => {
        try {
            let url = req.query.url;
            if(!url) throw new Error("Please provide URL");
            let isValid = isValidURL(url);
            if(!isValid) throw new Error("Invalid URL");
            let result = await bitly.shorten(url);
            res.status(200).send({status: true, shortendURL: result.id })
        } catch (e) {
            res.status(403).send({status: false, errorMessage: e.message })
        }
    })   
}
module.exports = {shortUrl}