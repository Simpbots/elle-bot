import { PermissionResolvable } from 'discord.js';
import papdongModel from '../../models/papdongModel';
import { RunFunction } from '../../types/command';

const name: string = 'deletepap';
const description: string = 'Delete pap';
const category: string = "Pap dong";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const run: RunFunction = async(client, message, args) => {
    if(!args) return message.channel.send('Please input arguments contain link of an image or id')
    if(!String(args[0]).startsWith('http') || !String(args[0]).startsWith('https')) {
        papdongModel.deleteOne({ _id: args[0] })
            .then(() => message.channel.send('Success delete operation'))
            .catch(e => message.channel.send('Failed delete operation'))
    }else {
         papdongModel.deleteOne({ link: args[0] })
            .then(() => message.channel.send('Success delete operation'))
            .catch(e => message.channel.send('Failed delete operation'))
    }
}

export { name, description, run, category, permissionUser }