const { prefix } = require('../config/config.json');
module.exports = {
	name: "clear",
	description: "Permet de clear le chat",
	execute(message, args) {
		if (!(message.member.roles.cache.has("988907096282124288")))
			return	message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Permission",
				description: "Vous n'avez pas la permission"
			}});
		

		if (parseInt(args[0]) >= 99)
			return	message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Nombre élevé",
				description: "Nombre max est 99"
			}});
		

		if (args > 0)
		{	
			const number = parseInt(args[0]) + 1;
			return message.channel.bulkDelete(number)
			.then(message)
			.catch(console.error);
		} else {
			return message.channel.send({embed: {
				color: 3447003,
				title: "Erreur: Pas d'argument",
				description: "Ex: !clear [nombre]"
			}});
		}
	},
};