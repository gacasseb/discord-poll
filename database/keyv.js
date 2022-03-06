const Keyv = require('@keyv/mongo');
const { mongo_password } = require('../config.json');

const keyv = new Keyv(`mongodb+srv://sysadm:${mongo_password}@casseb.4tucv.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);

keyv.on('error', err => console.error('Keyv connection error:', err));

module.exports = keyv;