const { Client } = require("discord.js");

module.exports = {
	name: "verify",
	description: "Permet de kick une personne",
	execute(message, args) {
		if (!(message.member.roles.cache.has("988907096282124288"))) {
            message.delete({ timeout: 10 })
            return;
        }

        message.channel.send({embed: {
            color: 3447003,
            title: "Vérification Anti Bot",
            description: `Veillez appuyer sur le   ✔️   pour etre vérifié !\n Attention noublier pas vos roles dans #Roles`,
    }});
    message.delete({ timeout: 10 });
	},
};