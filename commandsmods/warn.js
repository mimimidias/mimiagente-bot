module.exports = {
	name: 'warnmimiagente',
	description: 'Bot da um warn de forma anonima',
	execute(message) {
		const warn = message.content.substr(15);
		message.channel.send('.warn' + warn);
		console.log(message.content);
	},
};