// ==============================================================================================================
//
//										             MIMIAGENTE BOT
//
//													  VERSÃO 2.1.0
//
//							NÃO SE ESQUEÇA DE TIRAR O TOKEN ANTES DE ATUALIZAR O REPOSITORIO
//
// ==============================================================================================================

// ==============================================================================================================
// REQUISITANDO OS PACOTES
// ==============================================================================================================

const Discord = require('discord.js');
const fs = require('fs');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const {
	prefix,
	token,
} = require('./config.json');

// ==============================================================================================================
// INSTANCIANDO E CRIANDO VARIAVEIS GLOBAIS
// ==============================================================================================================

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const db = new sqlite.Database('./DB/Database.db', sqlite.OPEN_READWRITE);
const saltRounds = 10;

// =============================================================================================================
// FUNÇÕES DO BOT
// =============================================================================================================

// Indica quando está pronto pra ser usado
bot.once('ready', () => {
	console.log('Ready!');
});

// Requere todos os modulos
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

// Checa se a mensagem enviada é um comando
bot.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// Separa o comando passado em argumentos em formato de uma array
	const args = message.content.slice(prefix.length).trim().split(/ +/);

	// Retira o primeiro objeto da array
	const command = args.shift().toLowerCase();

	// Ignora se comando não existir
	if (!bot.commands.has(command)) return;

	// Declara variáveis ao receber umcomando

	// Pega um canal específico para enviar as respostas do comando
	const compchann = bot.channels.cache.get('820388959032573963');

	// Pega um servidor específico para verificar os usuários mais tarde
	const guild = bot.guilds.cache.get('435220331016486927');
	const answer = bot.users.cache;

	// Catch de erros para não impedir o bot de rodar caso aconteça.
	try {
		bot.commands.get(command).execute(message, args, db, bcrypt, saltRounds, compchann, answer, guild);
	}
	catch(error) {
		console.error(error);
		message.author.send('Erro inesperado.');
	}
});

// Loga o bot
bot.login(token);