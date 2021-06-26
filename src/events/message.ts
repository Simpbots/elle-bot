import { Command } from '../types/command';
import { RunFunction } from '../types/event';
import { Message } from 'discord.js';

const name: string = 'message';
const run: RunFunction = async(client, message: Message) => {
    if(message.author.bot || !message.guild) return;
    const prefix = client.listprefix[message.guild.id] || client.Config.prefix;
    if(message.content == `<@!${client.user.id}>`) return message.channel.send(`My prefix is ${"`"}${prefix}${"`"}`);
    if(client.autoresponseobject[message.guild.id] && client.pausearp == false) {
        const guildarp = client.autoresponseobject[message.guild.id]
        if(guildarp[message.content.toLowerCase()]) {
            message.channel.send(String(guildarp[message.content.toLowerCase()]).replace('{user}', `<@!${message.author.id}>`))
        }
    }
    if(message.content.toLowerCase() == 'pap dong' && client.papdong[message.guild.id] && client.pausepap == false) {
        let linkpap = client.papdong[message.guild.id];
        let randomize = linkpap[Math.floor(Math.random() * linkpap.length)]
        message.channel.send(randomize.link)
    }
    if(!message.content.startsWith(prefix)) return;
    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd: string = args.shift();

    const command: Command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if(!command) return;
    if(!message.guild.me.hasPermission(command.permissionBot)) return message.reply("Bot doesn't have permission to execute the command")
    if(!message.member.hasPermission(command.permissionUser)) return message.reply("You don't have permission for this command")
    command.run(client, message, args).catch((reason: any) => {
         message.channel.send(client.embed({ description: String(reason), title: 'Error ocure' }))
         console.error(reason)
    })
}

export { name, run }