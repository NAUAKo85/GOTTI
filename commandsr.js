const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

const config = require('../config');

module.exports = {

    data: new SlashCommandBuilder()

        .setName('r')

        .setDescription('Registrar veículo')

        .addStringOption(option =>
            option
                .setName('modelo')
                .setDescription('Nome do veículo')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('compra')
                .setDescription('Valor de compra')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('venda')
                .setDescription('Valor de venda')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('vip')
                .setDescription('Valor VIP')
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName('tipo')
                .setDescription('Tipo do veículo')
                .setRequired(true)
                .addChoices(
                    { name: 'Carro', value: '🚗' },
                    { name: 'Moto', value: '🏍️' }
                )
        ),

    async execute(interaction) {

        const modelo = interaction.options.getString('modelo');

        const compra = interaction.options.getString('compra');

        const venda = interaction.options.getString('venda');

        const vip = interaction.options.getString('vip');

        const tipo = interaction.options.getString('tipo');

        const canal = interaction.guild.channels.cache.get(config.canalEstoque);


        // EMBED

        const embed = new EmbedBuilder()

            .setColor('#4a4a4a')

            .setTitle(`${tipo} ${modelo}`)

            .setDescription(
                `📥 **Compra:** ${compra}\n` +
                `📤 **Venda:** ${venda}\n` +
                `💰 **VIP:** ${vip}\n\n` +
                `🟢 **LIVRE**`
            )

            .setFooter({
                text: `Registrado por ${interaction.user.username}`
            })

            .setTimestamp();


        const msg = await canal.send({

            embeds: [embed]

        });


        // REAÇÕES

        await msg.react(config.emojiVendido);

        await msg.react(config.emojiReservado);

        await msg.react(config.emojiLiberando);


        // RESPOSTA

        await interaction.reply({

            content: '✅ Veículo registrado.',

            ephemeral: true

        });

    }

};