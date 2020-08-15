// Module used for enviornment variable names, this command loads values from file .env
//require('dotenv').config();

// config.json
const {prefix, token} = require('./config.json');

// requires discord.js module
const Discord = require('discord.js');
//Create new Discord client instance
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

// When Discord client is ready, bot, run this. Only triggers on login
bot.once('ready',() => {
    console.log('Ready!');
});

bot.on('message', message => {
    // If the message either doesn't start with the prefix or was sent by a bot, exit
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    // args slices off the prefix entirely, removes the leftover whitespace and then spilts it into an array by spaces. Regular expression / +/
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    //Take the first element in array and return it while also removing it from the original array
    const command = args.shift().toLowerCase();

    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('Pong.');
    } else if (message.content.startsWith(`${prefix}beep`)) {
        message.channel.send('Boop.');
    }
    else if (message.content === `${prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);    
    }
    else if (command === 'kick') {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }        
        // grab the "first" mentioned user from the message
        // this will return a `User` object, just like `message.author`
        const taggedUser = message.mentions.users.first();
    
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }
    else if(command === 'avatar') {
        if (!message.mentions.users.size) {
            // The dynamic 
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true})}>`);
        }
    }
    else if (command === 'prune') {
        const amount = parseInt(args[0]);

        // Check for a valid number
        if (isNaN(amount)) {
            return message.reply('that doesn\'t seem to be a valid number.');
        } else if (amount <= 1 || amount > 100) {
            return message.reply('you need to input a number between 1 and 99.');
        }

        message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
        });
        message.channel.send(`Deleted ${amount} messages.`);
    }
});

// Login to Discord
bot.login(token);