import { PermissionResolvable } from 'discord.js-light';
import { RunFunction } from '../../types/command';

const name: string = 'kick';
const description: string = 'Kick user';
const category: string = "Moderation";
const permissionUser: PermissionResolvable[] = ['BAN_MEMBERS', 'ADMINISTRATOR', 'KICK_MEMBERS'];
const permissionBot: PermissionResolvable[] = ['KICK_MEMBERS'];
const run: RunFunction = async(client, message, args) => {
    if(args.length == 0) return message.channel.send('Please passing the required arguments')
    const user = message.mentions.users.first() || args[0];
    try {
        if(user == message.mentions.users.first()) {
            if(message.guild.members.cache.get(user.id).kickable == false) return message.channel.send('Cannot kick the user, immune')
            message.guild.members.cache.get(user.id).kick(args.slice(1) ? String(args.slice(1).join(' ')) : '')
        }else if(!isNaN(user)){
            if(message.guild.members.cache.get(user).kickable == false) return message.channel.send('Cannot kick the user, immune')
            message.guild.members.cache.get(user).kick(args.slice(1) ? String(args.slice(1).join(' ')) : '')
        } 
        
        message.channel.send(client.embed({ title: 'User has been kicked', description: `User : <@!${typeof user == 'object' ? user.id : user}>\nReason : ${!args.slice(1) ? '' : args.slice(1).join(' ')}\nModerator : <@!${message.author.id}>` }))

    } catch (error) {
        message.channel.send('Failed kick the user')
        client.logger.error(error)
    }
}

export { name, description, run, category, permissionUser, permissionBot }