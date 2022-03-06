const client = require('./services/client');
const democracia = require('./controllers/democracia');

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');

	} else if (commandName === 'server') {
		await interaction.reply('Server info.');

	} else if (commandName === 'user') {
		await interaction.reply('User info.');

	} else if (commandName === 'democracia') {
        democracia.create_poll(interaction);

    } else if (commandName === 'votar') {
		// Rota para registrar um voto
		democracia.add_vote(interaction);
		
	} else if (commandName === 'mostrar') {
		democracia.show_poll(interaction);
		await interaction.reply('Eleição atual:');
	}
});
