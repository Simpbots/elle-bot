import { PermissionResolvable } from 'discord.js-light';
import autoresponseModel from '../../models/autorepsonseModel';
import { RunFunction } from '../../types/command';

const name: string = 'deletearp';
const description: string = 'Delete auto response';
const category: string = "Autoresponse";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const aliases: string[] = ['darp'];
const run: RunFunction = async(client, message, args) => {
    if(!args[0]) return message.channel.send("Please input the autoresponse id")
    autoresponseModel.deleteOne({ _id: args[0] })
        .then(e => {
            return message.channel.send('Success delete autoresponse')
        })
        .catch(err => {
            console.log(err)
            return message.channel.send('Failed delete autoresponse')
        })
}

export { name, description, run, category, aliases, permissionUser }