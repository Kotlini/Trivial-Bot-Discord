const { Client } = require("discord.js");

module.exports = {
	name: "kick",
	description: "Permet de kick une personne",
	execute(message, args) {
		if (!(message.member.roles.cache.has("988907096282124288"))) {
            message.delete({ timeout: 10 })
            return;
        }
        
        if (args < 3) {
            message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Pas assez d'argument",
				description: "Ex: !kick [Nom Player] [args]"
		}});
        return;
        }

        const membre = message.mentions.members.first();

        if(!membre) {
            message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Membre invalide",
				description: "Ex: !kick [Nom Player] [args]"
		}});
            return;
        }

        let raison  = '';

        for (let i = 1; i < args.length; i++) {
            raison += args[i] + ' ';
        }

        membre.kick(raison);
        let channel = message.guild.channels.cache.get("995431236900229162")

        channel.send({embed: {
            color: 3447003,
            title: "Rapport membre kick",
            description: `Un kick à été effectué par: ${message.author}\nMembre kick: ${membre}\nRaison: ${raison}`,
    }});
    message.delete({ timeout: 10 });
	},
};