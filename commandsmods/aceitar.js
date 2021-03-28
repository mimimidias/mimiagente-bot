/* eslint-disable no-unused-vars */
module.exports = {
	name: 'aceitar',
	description: 'Adiciona uma crítica',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		const id = args[0];

		const query = 'SELECT * FROM issued WHERE id = ?';

		// Busca os dados
		db.get(query, [id], (err, row) => {

			if (id.startsWith('SUG')) {

				const write = db.prepare('INSERT INTO sugg VALUES(?, ?, ?, ?, ?)');
				write.run(row.id, row.user, row.body, row.anon, row.date);

				db.run('DELETE FROM issued WHERE ID = ?', id, function(err) {
					if (err) {
						return console.error(err.message);
					}
				});

				const embedmsg = {
					'title': '__**SUGESTÃO**__',
					'color': 65280,
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

				// Envia mensagem no canal designado no index.js
				compchann.send({
					content: `Mensagem aceita por <@${message.author.id}>`,
					embed: embedmsg,
				});

			}
			else if (id.startsWith('CRI')) {

				const write = db.prepare('INSERT INTO crit VALUES(?, ?, ?, ?, ?)');
				write.run(row.id, row.user, row.body, row.anon, row.date);

				db.run('DELETE FROM issued WHERE ID = ?', id, function(err) {
					if (err) {
						return console.error(err.message);
					}
				});

				const embedmsg = {
					'title': '__**CRÍTICA**__',
					'color': 65280,
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

				// Envia mensagem no canal designado no index.js
				compchann.send({
					content: `Mensagem aceita por <@${message.author.id}>`,
					embed: embedmsg,
				});

			}
			else if (id.startsWith('DEN')) {

				const write = db.prepare('INSERT INTO denun VALUES(?, ?, ?, ?, ?)');
				write.run(row.id, row.user, row.body, row.anon, row.date);

				db.run('DELETE FROM issued WHERE ID = ?', id, function(err) {
					if (err) {
						return console.error(err.message);
					}
				});

				const embedmsg = {
					'title': '__**DENÚNICA**__',
					'color': 65280,
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

				// Envia mensagem no canal designado no index.js
				compchann.send({
					content: `Mensagem aceita por <@${message.author.id}>`,
					embed: embedmsg,
				});

			}

		});
	},
};