let User = require('../db/models/user');
const webpush = require('web-push');

let upsertUser = async (req, res) => {
    try {
        let name = req.query.name; 
        await User.updateMany({name},{$inc : {count : 1}},{multi: true, upsert: true, new: true});
        if(global.subscription){
            const payload = JSON.stringify({ title: `name added`, data: "Success"});
            webpush.sendNotification(subscription, payload);
        }
        res.send({status: true})
    } catch (error) {
        res.send({status: false})
    }
    
}
module.exports = {upsertUser}