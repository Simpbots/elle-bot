import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';

const name: string = 'slowmode';
const description: string = 'Set slowmode to desire value';
const category: string = "Moderation";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS'];
const permissionBot: PermissionResolvable[] = ['MANAGE_CHANNELS'];
const aliases: string[] = ['sm'];
const run: RunFunction = async(client, message, args) => {
    if(args.length == 0) return message.channel.send(`Please input arguments needed <time> in second`);
    if(isNaN(args[0])) return message.channel.send('Please input pure numeric value');
    if(Number(args[0]) > 21600) return message.channel.send('Please input value less or equal to 21600');
    try {
        // @ts-ignore
        message.channel.setRateLimitPerUser(Number(args[0]))
            .then(e => {
                message.channel.send(`Success set slowmode to ${"`"}${Number(args[0])}${"`"} ${Number(args[0]) <= 1 ? 'second' : 'seconds'}`)
            })
    } catch (error) {
        console.error(error)
    }
    
}

export { name, description, run, category, aliases, permissionUser, permissionBot }