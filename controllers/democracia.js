const client = require('../services/client');
const keyv = require('../database/keyv');

const democracia = {
    index: async function(interaction) {
    },
    create_poll: async function(interaction) {

        let poll = new Poll();

        poll.option1 = interaction.options.getString('candidato1');
        poll.option2 = interaction.options.getString('candidato2');
        poll.description = interaction.options.getString('descrição');

        try { 
            await keyv.set('eleicao', JSON.stringify(poll));
            await interaction.reply('Eleição criada com sucesso!');
        } catch( error ) {
            await interaction.reply('Ocorreu um erro.');
        }
    },
    validate_poll: async function(poll) {
    },
    show_poll: async function(interaction) {
        try {
            let poll = await getPoll();
            const channel = client.channels.cache.find(channel => channel.name === 'eleição');
    
            let message = `
                ${poll.description}\n1 - ${poll.option1} (${poll.total1} Votos)\n2 - ${poll.option2} (${poll.total2} Votos)\n\nPara votar execute o comando "/votar 1" ou "/votar 2"
            `;
    
            channel.send(message);
        } catch (error) {
            console.log(error);
            interaction.reply('Ocorreu um erro.');
        }
    },
    add_vote: async function(interaction) {
        try {
            let poll = await getPoll();

            let userId = interaction.user.id;
            let user_has_voted = poll.votes.find(userVote => userVote == userId);

            if ( user_has_voted ) {
                await interaction.reply('Você já votou nessa eleição, tá achando que vai fraudar porra?');
                return;
            }

            const candidateVoted = interaction.options.getString('candidato');

            if ( candidateVoted == '1' || poll.option1 == candidateVoted ) {
                poll.total1++;

            } else if ( candidateVoted == '2' || poll.option2 == candidateVoted ) {
                poll.total2++;

            } else {
                await interaction.reply('Candidato não encontrado.');
                return;
            }
                
            poll.votes.push(userId);

            await keyv.set('eleicao', JSON.stringify(poll));

            await interaction.reply('Seu voto foi registrado com sucesso!');
            this.show_poll(interaction);

        } catch (error) {
            console.log(error);
            await interaction.reply('Ocorreu um erro.');
        }
    },
};

async function getPoll() {
    let poll = await keyv.get('eleicao');
    poll = JSON.parse(poll);

    return poll;
}

const Poll = {
    option1: '',
    option2: '',
    total1: 0,
    total2: 0,
    votes: [],
    description: '' 
};

module.exports = democracia;