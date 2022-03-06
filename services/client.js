const { Client, Intents } = require('discord.js');
const { token } = require('../config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Discord bot online!');
});

// Login to Discord with your client's token
client.login(token);

module.exports = client;