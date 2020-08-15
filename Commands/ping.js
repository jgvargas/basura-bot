// Module.exports is how you export data in Node.js so you can require() it in other files.
/*
If you need to access your client instance from inside one of your command files, you can 
access it via message.client. If you need to access things such as external files or modules, 
you should re-require them at the top of the file.
 */

module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(message) {
        message.channel.send('Pong.');
    },
};