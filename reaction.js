const {
    EmbedBuilder
} = require('discord.js');

const config = require('../config');

module.exports = (client) => {

    client.on('messageReactionAdd', async (reaction, user) => {

        if (user.bot) return;

        if (reaction.partial) {

            await reaction.fetch();

        }

        const mensagem = reaction.message;

        if (mensagem.channel.id !== config.canalEstoque) return;

        const embed = mensagem.embeds[0];

        if (!embed) return;

        const titulo = embed.title;

        const descricao = embed.description;


        // =========================
        // VENDIDO
        // =========================

        if (reaction.emoji.name === config.emojiVendido) {

            const canalVendidos =
                mensagem.guild.channels.cache.get(config.canalVendidos);

            const embedVendido = new EmbedBuilder()

                .setColor('#00FF00')

                .setTitle(titulo)

                .setDescription(

                    descricao.replace(
                        /🟢 \*\*LIVRE\*\*|🔴 \*\*RESERVADO\*\*|🕰 \*\*LIBERANDO\*\*/g,
                        '✅ **VENDIDO**'
                    )

                )

                .setFooter({
                    text: embed.footer?.text || ''
                })

                .setTimestamp();

            await canalVendidos.send({

                embeds: [embedVendido]

            });

            await mensagem.delete();

        }


        // =========================
        // RESERVADO
        // =========================

        if (reaction.emoji.name === config.emojiReservado) {

            const novoEmbed = new EmbedBuilder()

                .setColor('#FF0000')

                .setTitle(titulo)

                .setDescription(

                    descricao.replace(
                        /🟢 \*\*LIVRE\*\*|🕰 \*\*LIBERANDO\*\*/g,
                        '🔴 **RESERVADO**'
                    )

                )

                .setFooter({
                    text: embed.footer?.text || ''
                })

                .setTimestamp();

            await mensagem.edit({

                embeds: [novoEmbed]

            });

        }


        // =========================
        // LIBERANDO
        // =========================

        if (reaction.emoji.name === config.emojiLiberando) {

            const novoEmbed = new EmbedBuilder()

                .setColor('#FFA500')

                .setTitle(titulo)

                .setDescription(

                    descricao.replace(
                        /🟢 \*\*LIVRE\*\*|🔴 \*\*RESERVADO\*\*/g,
                        '🕰 **LIBERANDO**'
                    )

                )

                .setFooter({
                    text: embed.footer?.text || ''
                })

                .setTimestamp();

            await mensagem.edit({

                embeds: [novoEmbed]

            });

        }

    });

};