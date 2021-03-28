// ==============================================================================================================
// 											MODULO PARA RESPOSTA
// ==============================================================================================================

module.exports = {
	name: 'responder',
	description: 'Responde à uma sugestão critica ou denuncia',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		// Pega primeiro argumento da array como ID da mensagem
		const id = args[0];

		// Retira o primeiro item do argumento
		args.shift();

		// Cria uma string com array deargumentos
		const text = args.join(' ');

		// Checa o tipo de mensagem pela ID
		if (id.startsWith('SUG')) {

			// Cria a query string
			const query = 'SELECT * FROM sugg WHERE id = ?';

			// Busca os dados
			db.get(query, [id], (err, row) => {


				// Checa se o usuário é anônimo ou não
				if (row.anon === 'False') {

					// Cria embed para enviar mensagem
					const embedmsg = {
						'title': '__**SUGESTÃO**__',
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
						{
							'name': '**Resposta:**',
							'value': `${text}`,
						},
						],
					};

					// Envia mensagem para o usuário com a id salva
					answer.get(row.user).send({
						embed: embedmsg,
					});
					message.reply('Sugestão ' + row.id + ' respondida!');
				}

				// Se for anônimo
				else {

					// Cria uma lista ID de usuários no discord
					const members = guild.members.cache.map(member => member.id);

					// Cria embed para enviar mensagem
					const embedmsg = {
						'title': '__**SUGESTÃO**__',
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
						{
							'name': '**Resposta:**',
							'value': `${text}`,
						},
						],
					};

					// Cria um loop com todos os IDs do servidor
					for (let i = 0; i < members.length; i++) {

						// Compara o ID de todos os usuários com o ID encriptado
						bcrypt.compare(members[i], row.user, (err, match) => {

							// Se forem o mesmo
							if (match === true) {

								// Envia a mensagem para o usuário
								answer.get(members[i]).send({
									embed: embedmsg,
								});
								message.reply('Sugestão ' + row.id + ' respondida!');
							}
						});
					}
				}
			});
		}

		// Pega primeiro argumento da array como ID da mensagem
		else if (id.startsWith('CRI')) {

			// Cria a query string
			const query = 'SELECT * FROM crit WHERE id = ?';

			// Busca os dados
			db.get(query, [id], (err, row) => {

				// Checa se o usuário é anônimo ou não
				if (row.anon === 'False') {

					// Cria embed para enviar mensagem
					const embedmsg = {
						'title': '__**CRITICA**__',
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
						{
							'name': '**Resposta:**',
							'value': `${text}`,
						},
						],
					};

					// Envia mensagem para o usuário com a id salva
					answer.get(row.user).send({
						embed: embedmsg,
					});
					message.reply('Crítica ' + row.id + ' respondida!');
				}

				// Se for anônimo
				else {

					// Cria uma lista ID de usuários no discord
					const members = guild.members.cache.map(member => member.id);

					// Cria embed para enviar mensagem
					const embedmsg = {
						'title': '__**CRITICA**__',
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
						{
							'name': '**Resposta:**',
							'value': `${text}`,
						},
						],
					};

					// Cria um loop com todos os IDs do servidor
					for (let i = 0; i < members.length; i++) {

						// Compara o ID de todos os usuários com o ID encriptado
						bcrypt.compare(members[i], row.user, (err, match) => {

							// Se forem o mesmo
							if (match === true) {

								// Envia a mensagem para o usuário
								answer.get(members[i]).send({
									embed: embedmsg,
								});
								message.reply('Crítica ' + row.id + ' respondida!');
							}
						});
					}
				}
			});
		}
		// Pega primeiro argumento da array como ID da mensagem
		else if (id.startsWith('DEN')) {

			// Cria a query string
			const query = 'SELECT * FROM denun WHERE id = ?';

			// Busca os dados
			db.get(query, [id], (err, row) => {

				// Checa se o usuário é anônimo ou não
				if (row.anon === 'False') {

					// Cria embed para enviar mensagem
					const embedmsg = {
						'title': '__**DENUNCIA**__',
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
						{
							'name': '**Resposta:**',
							'value': `${text}`,
						},
						],
					};

					// Envia mensagem para o usuário com a id salva
					answer.get(row.user).send({
						embed: embedmsg,
					});
					message.reply('Denúncia ' + row.id + ' respondida!');
				}

				// Se for anônimo
				else {

					// Cria uma lista ID de usuários no discord
					const members = guild.members.cache.map(member => member.id);

					// Cria embed para enviar mensagem
					const embedmsg = {
						'title': '__**DENUNCIA**__',
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
						{
							'name': '**Resposta:**',
							'value': `${text}`,
						},
						],
					};

					// Cria um loop com todos os IDs do servidor
					for (let i = 0; i < members.length; i++) {

						// Compara o ID de todos os usuários com o ID encriptado
						bcrypt.compare(members[i], row.user, (err, match) => {

							// Se forem o mesmo
							if (match === true) {

								// Envia a mensagem para o usuário
								answer.get(members[i]).send({
									embed: embedmsg,
								});
								message.reply('Denúncia ' + row.id + ' respondida!');
							}
						});
					}
				}
			});
		}
	},
};