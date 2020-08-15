// Config env import
const {prefix, token} = require('./config.json');

// fs is Node's file system module
const fs = require('fs');

// requires discord.js module
const Discord = require('discord.js');

//Create new Discord client instance
const bot = new Discord.Client();
// Collection extends JS native Map class
bot.commands = new Discord.Collection();

// Dynamically retrieve all created command files
// readdirSync will return an array of all the file names in that directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Whenever a message is sent inside a channel bot has access to,
// the message content will be logged to console
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

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

    // Whenever you want to add a new command, you simply make a new file in your commands directory, 
    // name it what you want, and then do what you did for the other commands.
    if(!bot.commands.has(command))return;

    try{ 
        // .get() the ping command and call its .execute() method while passing in the message and args
        // vaiables as the method arguments.
        bot.commands.get(command).execute(message,args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that commands');
    }
});

// Login to Discord
bot.login(token);