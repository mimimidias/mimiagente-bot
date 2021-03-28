/* eslint-disable no-unused-vars */
module.exports = {
	name: 'comandos',
	description: 'Rejeita uma mensagem',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		const id = args[0];

		const embedmsg = {
			'title': '__**COMANDOS**__',
			'color': 9178291,
			'fields': [{
				'name': '**Sugestão pública:**',
				'value': 'Manda uma sugestão de forma pública para o time do mimimmidias\n`.suges texto da sugestão`',
			},
			{
				'name': '**Sugestão anônima:**',
				'value': 'Manda uma sugestão de forma anônima para o time do mimimmidias\n`.asuges texto da sugestão`',
			},
			{
				'name': '**Crítica pública:**',
				'value': 'Manda uma crítica de forma pública para o time do mimimmidias\n`.crit texto da crítica`',
			},
			{
				'name': '**Crítica anônima:**',
				'value': 'Manda uma crítica de forma anônima para o time do mimimmidias\n`.acrit texto da crítica`',
			},
			{
				'name': '**Denúncia pública:**',
				'value': 'Manda uma denúncia de forma pública para o time do mimimmidias\n`.denun texto da denúncia`',
			},
			{
				'name': '**Denúncia anônima:**',
				'value': 'Manda uma denúncia de forma anônima para o time do mimimmidias\n`.adenun texto da denúncia`',
			},
			],
		};

		// Envia mensagem no canal designado no index.js
		message.channel.send({
			embed: embedmsg,
		});

	},
};