const Discord = require('discord.js');
const fs = require('fs');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const db = new sqlite.Database('./DB/Database.db', sqlite.OPEN_READWRITE);
const saltRounds = 10;

const {
	prefix,
	token,
} = require('./config.json');

bot.once('ready', () => {
	console.log('Ready!');
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!bot.commands.has(command)) return;
	try {
		bot.commands.get(command).execute(message, args, db, bcrypt, saltRounds);
	}
	catch(error) {
		console.error(error);
		message.reply('Erro inesperado.');
	}
});

bot.login(token);