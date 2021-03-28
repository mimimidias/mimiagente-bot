/* eslint-disable no-unused-vars */
module.exports = {
	name: 'rejeitar',
	description: 'Rejeita uma mensagem',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		const id = args[0];

		const query = 'SELECT * FROM issued WHERE id = ?';

		// Busca os dados
		db.get(query, [id], (err, row) => {

			db.run('DELETE FROM issued WHERE ID = ?', id, function(err) {
				if (err) {
					return console.error(err.message);
				}
			});

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
					'color': 16711680,
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
					'color': 16711680,
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
				content: `Mensagem rejeitada por <@${message.author.id}>`,
				embed: embedmsg,
			});

		});
	},
};