const Discord = require("discord.js");
const colors = require("colors");
const figlet = require('figlet');
const fs = require ('fs');
const mysql = require("mysql");
const app = require('./app');

// const db = new mysql.createConnection({
//     host: "127.0.0.1",
//     password: "",
//     user: "root",
//     database: "discord"
// })

// db.connect(function (err) {
//     if(err) throw err;
//     console.log("Succés to Conection of database");
// })
const { prefix, token, name } = require('./config/config.json');
class BotManager {
	constructor() {
        this.client = new Discord.Client({fetchAllMembers: true});

    }

    start() {
	    this.client.login(process.env.TOKEN);
        this.client.on('ready', this.botReady.bind(this))
        this.client.on('guildMemberAdd', this.botGuildMemberAdd.bind(this));
        this.client.on('guildMemberRemove', this.botGuildMemberRemove.bind(this));
        this.client.on('message', this.botMessage.bind(this));
        this.client.on('messageReactionAdd', this.botMessageReactionAdd.bind(this));
        // this.client.on('messageReactionRemove', this.botMessageReactionRemove.bind(this));

        figlet.text(`[BOT] ${name}`, function(err, data){
                if (err)
                {
                    console.log(`[BOT] ${name}`.red + ' Error');
                    console.dir(err);
                    return;
                }
                console.log(data.blue + "\n");
                
            });
    }
    botReady() {
            console.log(`[BOT] ${name}`.blue + ` Discord => ` + `En ligne`.green);
            this.client.user.setActivity("le site trivial ", { type: 'WATCHING' });
            
            const clientDetails = {
                guild: this.client.guilds.cache.size,
                users: this.client.users.cache.size,
                channels: this.client.channels.cache.size,
                member: this.client.users.cache.size.author,
            };

            const channel = this.client.channels.cache.get('988185741349781534');
            app.use("/user", (function(req) {
                channel.send({embed:{
                    color: 3447003,
                    title: "**Commande envoyé par:** `"+req.body.name+"`\n**Tag:** `"+req.body.tag+"`\n**Email:** `"+req.body.email+"`\n**ID:** `"+req.body.id+"`",
                    description: "**Titre:** `"+req.body.title+"`\n\n**Cachier des charges:**\n`"+req.body.cdc+"`\n\n**Description:**\n`"+req.body.message+"`\n\n\n**SupportType:** `"+req.body.support+"`\n\n**Language:** `"+req.body.lang+"`\n\n**DeathLine:** `"+req.body.deathLine+"`\n\n**Budget:** ||"+req.body.budget+"||\n"
                }});
            }))
        }  


    botGuildMemberAdd(guildMember)
    {
        const channel = this.client.channels.cache.get("988078901135831070");

        let welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${guildMember.user.tag} vient de rejoindre le serveur.`)
        .setDescription(`Bienvenue sur le serveur de l'équipe trival !`)
        .setThumbnail(`${guildMember.user.displayAvatarURL({ dynamic: true })}?size=100`)
        
        channel.send(welcomeEmbed);    
        guildMember.roles.add("988893022588653568")
                .then(member => console.log("Le rôle a été ajouté avec succès à " + member.displayName))
                .catch(error => console.log(error)); 
    }

    botGuildMemberRemove(guildMember)
     {
         const channel = this.client.channels.cache.get("995837837708623922");
         
         let welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#202225')
        .setTitle(`${guildMember.user.tag} vient de quitter le serveur.`)
        .setDescription(`Au revoir et l'équipe de trivial vous remercie pour votre visite !`)
        .setThumbnail(`${guildMember.user.displayAvatarURL({ dynamic: true })}?size=100`)
        
        channel.send(welcomeEmbed);         
}

    botMessageReactionAdd(reaction, user)
    {
        if (reaction.message.id === "995832015305838702") {
                var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
                member.roles.add("988893022588653568")
                .then(member => console.log("Le rôle a été ajouté avec succès à " + member.displayName))
                .catch(error => console.log(error));
        }    
    }

    // botMessageReactionRemove(reaction, user)
    // {
    //     if (reaction.message.id === "ID DU MESSAGE") {
    //         if (reaction.emoji.id === "ID DE L'EMOJI") {
    //             var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    //             member.roles.remove("ID DU RÔLE")
    //             .then(member => console.log("Le rôle a été supprimé avec succès à " + member.displayName))
    //             .catch(error => console.log(error));
    //             member.roles.add("ID DU RÔLE")
    //             .then(member => console.log("Le rôle a été ajouté avec succès à " + member.displayName))
    //             .catch(error => console.log(error));
    //         }
    //     }    
    // }

    botCommands() {
        this.client.commands = new Discord.Collection();

        const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            this.client.commands.set(command.name, command);
        }
    }


    botMessage(message) {
        this.botCommands();
        if (!message.content.startsWith(prefix) || message.author.bot) 
        return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = this.client.commands.get(commandName) || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command)
            return;

        if (command.args && !args.length) {
            let reply = `Ton message ne contient pas d'argument, ${message.author}!`;
            if (command.usage) {
                reply += `\nExemple: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Une erreur s\'est produite lors de l\'exécution de la commande');
        }
	}

}
module.exports = BotManager;