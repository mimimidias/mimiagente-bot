module.exports = {
	name: 'banmimiagente',
	description: 'Bot da um ban de forma anonima.',
	execute(message) {
		const ban = message.content.substr(14);
		message.channel.send('.ban' + ban);
		console.log(message.content);
	},
};