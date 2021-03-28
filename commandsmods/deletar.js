/* eslint-disable no-unused-vars */
module.exports = {
	name: 'deletar',
	description: 'Adiciona uma crítica',
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		const id = args[0];

		const query = 'SELECT * FROM sugg WHERE id = ? UNION SELECT * FROM crit WHERE id = ? UNION SELECT * FROM issued WHERE id = ?';

		// Busca os dados
		db.get(query, [id, id, id], (err, row) => {

			if(row === undefined) {
				message.reply('Mensagem não existe ou não foi aceita.');
				return;
			}
			if (row.id.startsWith('SUG')) {
				db.run('DELETE FROM sugg WHERE ID = ?', id, function(err) {
					if (err) {
						return console.error(err.message);
					}
				});
				let embedmsg = {};
				if (row.anon === 'False') {
					embedmsg = {
						'title': '__**SUGESTÃO**__',
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
						'title': '__**SUGESTÃO**__',
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
					content: `Mensagem deletada por <@${message.author.id}>`,
					embed: embedmsg,
				});

			}
			else if (row.id.startsWith('CRI')) {
				db.run('DELETE FROM crit WHERE ID = ?', id, function(err) {
					if (err) {
						return console.error(err.message);
					}
				});
				let embedmsg = {};
				if (row.anon === 'False') {
					embedmsg = {
						'title': '__**CRÍTICA**__',
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
						'title': '__**CRÍTICA**__',
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
					content: `Mensagem deletada por <@${message.author.id}>`,
					embed: embedmsg,
				});

			}
			else if (row.id.startsWith('DEN')) {
				db.run('DELETE FROM denun WHERE ID = ?', id, function(err) {
					if (err) {
						return console.error(err.message);
					}
				});
				let embedmsg = {};
				if (row.anon === 'False') {
					embedmsg = {
						'title': '__**DENÚNCIA**__',
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
						'title': '__**DENÚNCIA**__',
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
					content: `Mensagem deletada por <@${message.author.id}>`,
					embed: embedmsg,
				});

			}
		});
	},
};