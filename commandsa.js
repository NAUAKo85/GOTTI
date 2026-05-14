const {
    SlashCommandBuilder
} = require('discord.js');

const config = require('../config');

module.exports = {

    data: new SlashCommandBuilder()

        .setName('a')

        .setDescription('Gerar anúncio automático'),

    async execute(interaction) {

        const canal =
            interaction.guild.channels.cache.get(config.canalEstoque);

        const mensagens =
            await canal.messages.fetch({
                limit: 100
            });

        let listaVeiculos = '';

        mensagens.reverse().forEach(msg => {

            const embed = msg.embeds[0];

            if (!embed) return;

            const modelo = embed.title;

            const descricao = embed.description;


            // PEGAR VALOR

            const vendaMatch =
                descricao.match(/📤 \*\*Venda:\*\* (.+)/);

            const valor =
                vendaMatch ? vendaMatch[1] : 'N/A';


            // STATUS

            let statusTexto = 'LIVRE';

            if (descricao.includes('🔴')) {

                statusTexto = 'RESERVADO';

            }

            if (descricao.includes('🕰')) {

                statusTexto = 'LIBERANDO';

            }

            if (descricao.includes('✅')) {

                statusTexto = 'VENDIDO';

            }


            // TIPO

            let emojiVeiculo = '🚙';

            if (modelo.includes('🏍️')) {

                emojiVeiculo = '🏍️';

            }


            // REMOVER EMOJI DO TITULO

            const nomeLimpo = modelo
                .replace('🚗 ', '')
                .replace('🏍️ ', '');


            // MONTAR

            listaVeiculos += `
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ${emojiVeiculo} | **${nomeLimpo}**  <:lgc_bluedot:1053018765702463498> **${statusTexto}**
\`\`\`ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ💰 ${valor}\`\`\`
`;

        });


        const anuncio = `**◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇《𝗚𝗥𝗢𝗧𝗧𝗜》◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇**

<:lgcmoney:1208343263648677888> **Melhores Preços**ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ<:lgcdisct:1208343300260495430> **Aceitamos Seu Veiculo Como Pagamento**

${listaVeiculos}

# ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤGROTTI CONCESSIONÁRIA

**◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇**`;


        await interaction.reply({

            content: anuncio

        });

    }

};