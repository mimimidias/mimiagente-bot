module.exports = {
	name: 'adenun',
	description: 'Adiciona uma denúncia anonima',
	execute(message, args, db, bcrypt, saltRounds) {
		const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;
		console.log(id_number);
		const ID = `DEN_${id_number}`;
		const user = message.author.id;
		const body = args.join(' ');
		const anon = 'True';
		const date = new Date();
		const type = 'DENÚNCIA';

		bcrypt.hash(user, saltRounds, function(err, hash) {
			// Store hash in your password DB.
			const write = db.prepare('INSERT INTO denun VALUES(?, ?, ?, ?, ?)');
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

		const postchann = message.guild.channels.cache.find(c => c.id === '820388959032573963');
		postchann.send({
			embed: embedmsg,
		});
	},

};