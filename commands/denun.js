module.exports = {
	name: 'denun',
	description: 'Adiciona uma denúncia',
	execute(message, args, db) {
		const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;
		console.log(id_number);
		const ID = `DEN_${id_number}`;
		const user = message.author.id;
		const body = args.join(' ');
		const anon = 'False';
		const date = new Date();
		const type = 'DENÚNCIA';

		const write = db.prepare('INSERT INTO denun VALUES(?, ?, ?, ?, ?)');
		write.run(ID, user, body, anon, date);

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
				'value': `<@${user}>`,
			},
			],
		};

		const postchann = message.guild.channels.cache.find(c => c.id === '820388959032573963');
		postchann.send({
			embed: embedmsg,
		});
	},

};