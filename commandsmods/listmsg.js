/* eslint-disable no-unused-vars */
module.exports = {
	name: 'listmsgs',
	description: 'Adiciona uma crítica',
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {
		const query = 'SELECT id FROM issued';

		// Busca os dados
		db.all(query, (err, row) => {
			if(row === undefined) {
				message.reply('Não existe nenhuma mensagem');
				return;
			}
			let idstring = '';
			row.some(e =>{
				idstring += `ID: ${e.id}\n`;
			});
			const embedmsg = {
				'title': '__**MENSAGENS ENVIADAS**__',
				'color': 9178291,
				'fields': [{
					'name': '**Lista de mensagens que não foram aceitas nem rejeitadas:**',
					'value': `${idstring}`,
				},
				],
			};

			// Envia mensagem no canal designado no index.js
			compchann.send({
				embed: embedmsg,
			});
		});
	},
};