/* eslint-disable no-unused-vars */
module.exports = {
	name: 'listcrits',
	description: 'Adiciona uma crítica',
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {
		const query = 'SELECT id FROM crit';

		// Busca os dados
		db.all(query, (err, row) => {
			if(row === undefined) {
				message.reply('Não existe nenhuma crítica');
				return;
			}
			let idstring = '';
			row.some(e =>{
				idstring += `ID: ${e.id}\n`;
			});
			const embedmsg = {
				'title': '__**CRÍTICAS ACEITAS**__',
				'color': 9178291,
				'fields': [{
					'name': '**Lista de cr´ticas:**',
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