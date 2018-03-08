const ping = require('./ping');
const short = require('./short');
const long = require('./long');

module.exports = [].concat(ping, short, long);
