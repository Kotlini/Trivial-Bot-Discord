module.exports = {
	name: 'avatar',
	description: 'Permet d\'afficher l\'avatar d\'un utilisateur.',
	execute(message) {
        if (!message.mentions.users.size) {
            return message.channel.send({embed: {
				color: 3447003,
				title: "Voici le lien de votre avatar",
				description: `${message.author.displayAvatarURL({ format:"png" , dynamic: true})}?size=60`
			}});
        }
        const avatarList = message.mentions.users.map(function(user)  {
            return `L'avatar de ${user.name} est: ${user.displayAvatarURL({ format:"png", dynamic: true })}?size=60`;
        });
        message.channel.send(avatarList);
	},
};