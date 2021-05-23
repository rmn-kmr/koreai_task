var nrc = require('node-run-cmd');
nrc.run('./node_modules/web-push/src/cli.js generate-vapid-keys --json',{ onData: function(data) {
    console.log();
    let keys = JSON.parse(data);
    process.env.PUBLIC_VAPID_KEY = keys.publicKey;
    process.env.PRIVATE_VAPID_KEY = keys.privateKey;
    require('./server')
} })