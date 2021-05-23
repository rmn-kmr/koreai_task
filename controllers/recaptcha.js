let { randomString } = require("../helper/utils");
const { createCanvas, loadImage } = require('canvas')
let randomCahche = {};

let genrateRecaptcha = (req, res) => {
    let randomNumber = randomString(8);
    let imageValue = randomString(4, Date.now());
    randomCahche[imageValue] = {randomNumber};
    res.status(200).send({ randomNumber, imageValue })
}

let getRecaptchaImage = async (req, res) => {
    let { imageValue } = req.query;
    let {randomNumber} = randomCahche[imageValue] || {} ;
    const canvas = createCanvas(400, 200)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (randomNumber) {
        const imageData = randomString(5);
        randomCahche[imageValue] = {randomNumber, imageData};
        ctx.font = '90px Impact'
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.rotate(0.2)
        ctx.fillStyle = '#fff'
        ctx.font = 'bold 30pt Menlo'
        ctx.fillText(imageData, 200, 70);
    } else {
        let image = await loadImage('./public/images/error.png');
        ctx.drawImage(image, 140, 50, 100, 100)
    }
    let img = canvas.toDataURL();
    res.send(`<img class="generated-captcha" src="${img}">`);
}

module.exports = { genrateRecaptcha, getRecaptchaImage }