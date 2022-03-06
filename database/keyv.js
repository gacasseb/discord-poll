const Keyv = require('@keyv/mongo');
const { database_url } = require('../config.json');

const keyv = new Keyv(database_url);

keyv.on('error', err => console.error('Keyv connection error:', err));

module.exports = keyv;