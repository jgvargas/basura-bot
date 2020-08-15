module.exports = {
    name: 'avatar',
    description: 'Avatar command displays the users avatar',
    execute(message) {
        if (!message.mentions.users.size) {
            // The dynamic 
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true})}>`);
        }

        const avatarList = message.mentions.users.map(user => {
           return `${user.username}'s avatar: ${message.author.displayAvatarURL({ dynamic:true })}`; 
        } );

        message.channel.send(avatarList);
    },
};