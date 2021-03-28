/* eslint-disable no-unused-vars */
module.exports = {
	name: 'listsuges',
	description: 'Lista sugestões',
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {
		const query = 'SELECT id FROM sugg';

		// Busca os dados
		db.all(query, (err, row) => {
			if(row === undefined) {
				message.reply('Não existe nenhuma sugestão');
				return;
			}
			let idstring = '';
			row.some(e =>{
				idstring += `ID: ${e.id}\n`;
			});
			const embedmsg = {
				'title': '__**SUGESTÕES ACEITAS**__',
				'color': 9178291,
				'fields': [{
					'name': '**Lista de sugestões:**',
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