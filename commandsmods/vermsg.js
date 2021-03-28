/* eslint-disable no-unused-vars */
module.exports = {
	name: 'vermsg',
	description: 'Adiciona uma crítica',
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		const id = args[0];

		const query = 'SELECT * FROM sugg WHERE id = ? UNION SELECT * FROM issued WHERE id = ? UNION SELECT * FROM crit WHERE id = ? UNION SELECT * FROM  denun WHERE id = ?';

		// Busca os dados
		db.get(query, [id, id, id, id], (err, row) => {
			if(row === undefined) {
				message.reply('Mensagem não existe');
				return;
			}
			let type = '';
			if (row.id.startsWith('SUG')) {
				type = 'SUGESTÃO';
			}
			else if (row.id.startsWith('CRI')) {
				type = 'CRÍTICA';
			}
			else if (row.id.startsWith('DEN')) {
				type = 'DENÚNCIA';
			}
			let embedmsg = {};
			if (row.anon === 'False') {
				embedmsg = {
					'title': `__**${type}**__`,
					'color': 9178291,
					'timestamp': `${row.date}`,
					'fields': [{
						'name': '**ID**',
						'value': `${row.id}`,
					},
					{
						'name': 'Mensagem',
						'value': `${row.body}`,
					},
					{
						'name': '**Usuário**',
						'value': `<@${row.user}>`,
					},
					],
				};
			}
			if (row.anon === 'True') {
				embedmsg = {
					'title': `__**${type}**__`,
					'color': 9178291,
					'timestamp': `${row.date}`,
					'fields': [{
						'name': '**ID**',
						'value': `${row.id}`,
					},
					{
						'name': 'Mensagem',
						'value': `${row.body}`,
					},
					{
						'name': '**Usuário**',
						'value': 'Anônimo',
					},
					],
				};
			}

			// Envia mensagem no canal designado no index.js
			compchann.send({
				embed: embedmsg,
			});
		});
	},
};