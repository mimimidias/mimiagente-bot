// ==============================================================================================================
// 											MODULO PARA SUGESTÕES
// ==============================================================================================================

module.exports = {
	name: 'suges',
	description: 'Adiciona uma sugestão',

	// Função
	execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild) {

		// Deleta comando enviado
		message.delete();

		// Cria ID da sugestão
		const id_number = `${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}${Math.floor(Math.random() * (9 - 1)) + 1}`;
		const ID = `SUG_${id_number}`;

		// Pega ID do usuário
		const user = message.author.id;

		// Cria uma string a partir da array de argumentos
		const body = args.join(' ');

		// Cria variáveis locais
		const anon = 'False';
		const date = new Date();
		const type = 'SUGESTÃO';

		// Escreve no banco de dados
		const write = db.prepare('INSERT INTO sugg VALUES(?, ?, ?, ?, ?)');
		write.run(ID, user, body, anon, date);

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
				'value': `<@${user}>`,
			},
			],
		};

		// Envia mensagem no canal designado no index.js
		compchann.send({
			embed: embedmsg,
		});
	},

};