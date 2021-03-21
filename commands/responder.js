module.exports = {
	name: 'responder',
	description: 'Responde à uma sugestão critica ou denuncia',
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {
		const id = args[0];
		args.shift();
		const text = args.join(' ');
		if (id.startsWith('SUG')) {
			const query = 'SELECT * FROM sugg WHERE id = ?';
			db.get(query, [id], (err, row) => {
				if (row.anon === 'False') {
					const embedmsg = {
						'title': '__**SUGESTION**__',
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
					answer.get(row.user).send({
						embed: embedmsg,
					});
				}
				else {
					const members = guild.members.cache.map(member => member.id);
					const embedmsg = {
						'title': '__**SUGESTION**__',
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
					for (let i = 0; i < members.length; i++) {
						bcrypt.compare(members[i], row.user, (err, match) => {
							if (match === true) {
								answer.get(members[i]).send({
									embed: embedmsg,
								});
							}
						});
					}
				}
			});
			console.log(query);
		}
	},
};