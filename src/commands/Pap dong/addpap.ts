import { PermissionResolvable } from 'discord.js-light';
import papdongModel from '../../models/papdongModel';
import { RunFunction } from '../../types/command';

const name: string = 'addpap';
const description: string = 'Add pap';
const category: string = "Pap dong";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const run: RunFunction = async(client, message, args) => {
    if(!args) return message.channel.send('Please input arguments contain link of an image')
    if(!String(args[0]).startsWith('http') || !String(args[0]).startsWith('https')) return message.channel.send('Please put correct url')
    new papdongModel({
        link: args[0],
        guildId: message.guild.id
    }).save()
        .then(x => {
            return message.channel.send(`Success saved. This image id is ${"`"}${x['_id']}${"`"}`)
        })
}

export { name, description, run, category, permissionUser }