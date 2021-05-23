const { BitlyClient } = require('bitly');
module.exports = new BitlyClient(process.env.BITLY_TOKEN, {});
