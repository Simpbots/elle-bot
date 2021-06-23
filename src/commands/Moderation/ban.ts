import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'ban';
const description: string = 'Ban user';
const category: string = "Moderation";
const permissionUser: PermissionResolvable[] = ['BAN_MEMBERS', 'ADMINISTRATOR', 'KICK_MEMBERS'];
const permissionBot: PermissionResolvable[] = ['BAN_MEMBERS'];
const run: RunFunction = async(client, message, args) => {
    if(args.length == 0) return message.channel.send(`Please passing the required arguments`)
    const user = message.mentions.users.first() || args[0];
    try {
        if(user == message.mentions.users.first()) {
            if(message.guild.members.cache.get(user.id).bannable == false) return message.channel.send('Cannot ban the user, immune')
            message.guild.members.cache.get(user.id).ban({ reason: args.slice(1) ? String(args.slice(1).join(' ')) : '' })
        }else if(!isNaN(user)){
            if(message.guild.members.cache.get(user).bannable == false) return message.channel.send('Cannot ban the user, immune')
            message.guild.members.cache.get(user).ban({ reason: args.slice(1) ? String(args.slice(1).join(' ')) : '' })
        }
        console.log(isNaN(user) ? user.id : user)
        message.channel.send(client.embed({ title: 'User has been banned', description: `User : <@!${typeof user == 'object' ? user.id : user}>\nReason : ${!args.slice(1) ? '' : args.slice(1).join(' ')}\nModerator : <@!${message.author.id}>` }))
    } catch (error) {
        message.channel.send('Failed ban the user')
        client.logger.error(error)
    }
}

export { name, description, run, category, permissionUser, permissionBot }