const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('mostrar').setDescription('Show a existing poll.'),
	new SlashCommandBuilder().setName('votar').setDescription('Votes on an existing poll.')
		.addStringOption(option => option.setName('candidato').setDescription('Nome ou id do candidato que deseja votar.')),
    new SlashCommandBuilder().setName('democracia').setDescription('Starts a new poll.')
        .addStringOption(option => option.setName('candidato1').setDescription('Nome do primeiro candidato'))
        .addStringOption(option => option.setName('candidato2').setDescription('Nome do segundo candidato'))
		.addStringOption(option => option.setName('descrição').setDescription('Nome do segundo candidato')),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);