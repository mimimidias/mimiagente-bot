/* eslint-disable no-unused-vars */
// ==============================================================================================================
// 										   MODULO PARA CRÍTICA ANÔNIMA
// ==============================================================================================================

module.exports = {
	name: 'acrit',
	description: 'Adiciona uma crítica anonima',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		// Deleta comando enviado
		message.delete();

		// Cria query para checar todas as sugestões
		const query = 'SELECT id FROM crit UNION SELECT id FROM issued WHERE id LIKE \'CRI%\'';

		// eslint-disable-next-line no-var
		var ID;

		// Busca os dados
		db.all(query, (err, row) => {

			// Checa se ID é única
			if (row === undefined || row.length === 0) {
				// Cria ID da sugestão
				const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;

				// eslint-disable-next-line no-var
				ID = `CRI_${id_number}`;
			}
			else {
				// Cria ID da sugestão
				let id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;

				// eslint-disable-next-line no-var
				ID = `CRI_${id_number}`;
				while ((row.some(e => e.id == ID)) == true) {

					// Cria ID da sugestão
					id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;

					// eslint-disable-next-line no-var
					ID = `CRI_${id_number}`;
				}
			}

			// Pega ID do usuário
			const user = message.author.id;

			// Cria uma string a partir da array de argumentos
			const body = args.join(' ');

			// Cria variáveis locais
			const anon = 'True';
			const date = new Date();
			const type = 'CRÍTICA';

			// Encripta usuário
			bcrypt.hash(user, saltRounds, function(err, hash) {

				// Escreve no banco de dados
				const write = db.prepare('INSERT INTO issued VALUES(?, ?, ?, ?, ?)');
				write.run(ID, hash, body, anon, date);

			});

			// Cria embed para enviar mensagem
			const embedmsg = {
				'title': `__**${type}**__`,
				'color': 9178291,
				'timestamp': `${date}`,
				'fields': [{
					'name': '**ID**',
					'value': `${ID}`,
				},
				{
					'name': 'Mensagem',
					'value': `${body}`,
				},
				{
					'name': '**Usuário**',
					'value': 'Anônimo',
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