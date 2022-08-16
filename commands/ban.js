const { Client } = require("discord.js");

module.exports = {
	name: "ban",
	description: "Permet de ban un membre",
	execute(message, args) {
		if (!(message.member.roles.cache.has("988907096282124288"))) {
            message.delete({ timeout: 10 })
            return;
        }
        
        if (args < 3) {
            message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Pas assez d'argument",
				description: "Ex: !ban [Nom Player] (Optional: [days]) [args]"
		}});
        return;
        }

        const membre = message.mentions.members.first();

        if(!membre) {
            message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Membre invalide",
				description: "Ex: !ban [Nom Player] (Optional: [days]) [args]"
		}});
            return;
        }

        let raison  = '';

        for (let i = 2; i < args.length; i++) {
            raison += args[i] + ' ';
        }

        let day = args[2]

        if(isNaN(day) == false) {
            membre.ban({ days: day, reason: raison});
            let channel = message.guild.channels.cache.get("995431236900229162")
    
            channel.send({embed: {
                color: 3447003,
                title: "Rapport membre ban",
                description: `Un ban à été effectué par: ${message.author}\nMembre ban: ${membre}\nRaison: ${raison}\nPendant: ${day} jour(s)`,
        }});
        }else {
        membre.ban(raison);
        let channel = message.guild.channels.cache.get("995431236900229162")

        channel.send({embed: {
            color: 3447003,
            title: "Rapport membre ban",
            description: `Un ban à été effectué par: ${message.author}\nMembre ban: ${membre}\nRaison: ${raison}`,
    }});
        }
    message.delete({ timeout: 10 })
        
	},
};