const botAPI = require("../index");
module.exports = {
    name: "status",
    description: "Permet de voir les status du bot",
    
    async execute(message, bot, args) {
        message.channel.send("Calcule des status en cour...").then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp;
            const pingAPI = botAPI.ping
            
            message.delete({ timeout: 10 })
            message.channel.send({embed:{
                color: 3447003,
                title: `**Statu**: \'ONLINE\'`,
                description: `**Ping**: \'${ping}\'ms`
            }})
        });
    
	},
};