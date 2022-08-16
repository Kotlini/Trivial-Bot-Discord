module.exports = {
    name: 'desc',
    description: 'Permet de voir la description d\'un joueur',
    execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send({embed:{
                color: 3447003,
                title: "Voici votre description",
                description: `${message.author.description}.blue`
            }});
        }

        const descList = message.mentions.users.map(function(user) {
            return ``;
        });
        message.channel.send({embed:{
            color: 3447003,
            title: "Voici votre description",
            description: `${message.author.description}.blue`
        }});
},
};