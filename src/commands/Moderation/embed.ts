import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'embed';
const description: string = 'Send embed messages';
const category: string = "Moderation";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS'];
const permissionBot: PermissionResolvable[] = ['MANAGE_CHANNELS'];
const run: RunFunction = async(client, message, args) => {
    if(message.channel.type == 'text' || message.channel.type == 'news') {
       if(args.length == 0) return message.channel.send('Please input your messages in arguments')
       message.channel.send(client.embed({ description: args.join(' ') }).setFooter(message.guild.name)).then(e => message.delete())
    }
}

export { name, description, run, category, permissionUser, permissionBot }