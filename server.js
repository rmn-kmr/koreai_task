const express = require('express');
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
const {shortUrl} = require('./controllers/urlshort');
const {upsertUser} = require('./controllers/user');
const {getAllPassenger} = require('./controllers/passenger');
const {genrateRecaptcha, getRecaptchaImage} = require('./controllers/recaptcha');
const webpush = require('web-push');
require('./db')
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webpush.setVapidDetails('mailto:rmn@kmr.io', publicVapidKey, privateVapidKey);
let subscriptions = [];
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.render('sortendUrl',{});
});

app.get('/shorturl', shortUrl);

app.get('/passsenger', getAllPassenger);

app.get('/recaptcha', genrateRecaptcha);

app.get('/recaptcha/image', getRecaptchaImage);

app.get("/webnotify", (req, res) => {
    res.render('webpush',{});
})

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    global.subscription = subscription;
    res.send({status: true})
});

app.get('/user', upsertUser)

app.listen(port, () => console.log(`Server is up and running on port ${port}!`));