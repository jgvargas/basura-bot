
module.exports = {
    name: 'server',
    description: 'Server command!',
    execute(message,args) {
        Message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    },
};