/* eslint-disable no-unused-vars */
module.exports = {
	name: 'comandosmod',
	description: 'Rejeita uma mensagem',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		const id = args[0];

		const embedmsg = {
			'title': '__**COMANDOS DOS MODS**__',
			'color': 9178291,
			'fields': [{
				'name': '**Lista de mensagens:**',
				'value': 'Lista mensagens enviadas que ainda não foram aceitas nem rejeitadas\n`.listmsgs`',
			},
			{
				'name': '**Aceitar mensagem:**',
				'value': 'Aceita sugestão/crítica/denúncia\n`.aceitar id`',
			},
			{
				'name': '**Rejeitar mensagem:**',
				'value': 'Rejeita sugestão/crítica/denúncia\n`.rejeitar id`',
			},
			{
				'name': '**Deletar mensagem:**',
				'value': 'Deleta sugestão/crítica/denúncia aceitas.\n`.deletar id`',
			},
			{
				'name': '**Lista de sugestões:**',
				'value': 'Lista sugestões aceitas\n`.listsuges`',
			},
			{
				'name': '**Lista de críticas:**',
				'value': 'Lista críticas aceitas\n`.listcrits`',
			},
			{
				'name': '**Lista de denúncias:**',
				'value': 'Lista denúncias aceitas\n`.listdenuns`',
			},
			{
				'name': '**Ver mensagem:**',
				'value': 'Mostra detalhes da sugestão/crítica/denúncia\n`.vermsg id`',
			},
			{
				'name': '**Responder mensagem:**',
				'value': 'Responde a sugestão/crítica/denúncia no DM do usuário que enviou\n`.responder id texto da resposta`',
			},
			{
				'name': '**Warn:**',
				'value': 'Manda warn de forma anônima\n`.warnmimiagente @usuario motivo`',
			},
			{
				'name': '**Ban:**',
				'value': 'Bane de forma anônima\n`.banmimiagente @usuario motivo`',
			},
			],
		};

		// Envia mensagem no canal designado no index.js
		message.channel.send({
			embed: embedmsg,
		});

	},
};