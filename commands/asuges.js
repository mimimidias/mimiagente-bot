module.exports = {
	name: 'asuges',
	description: 'Adiciona uma sugestão anonima',
	execute(message, args, db, bcrypt, saltRounds, compchann) {
		message.delete();
		const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;
		console.log(id_number);
		const ID = `SUG_${id_number}`;
		const user = message.author.id;
		const body = args.join(' ');
		const anon = 'True';
		const date = new Date();
		const type = 'SUGESTÃO';

		bcrypt.hash(user, saltRounds, function(err, hash) {
			// Store hash in your password DB.
			const write = db.prepare('INSERT INTO sugg VALUES(?, ?, ?, ?, ?)');
			write.run(ID, hash, body, anon, date);
		});

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

		compchann.send({
			embed: embedmsg,
		});
	},

};