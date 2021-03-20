const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () =>{
    console.log ('Ready!')
})

client.on('message', message =>{

    if(message.content.startsWith(`${prefix}warnmimiagente `)){
        var warn = message.content.substr(15)
        message.channel.send(".warn" + warn)
        console.log(message.content);
    }
})

client.on('message', message =>{

    if(message.content.startsWith(`${prefix}banmimiagente `)){
        var warn = message.content.substr(14)
        message.channel.send(".ban" + warn)
        console.log(message.content);
    }
})

client.login(token);
