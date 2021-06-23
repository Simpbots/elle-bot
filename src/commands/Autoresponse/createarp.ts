import { PermissionResolvable } from 'discord.js';
import autoresponseModel from '../../models/autorepsonseModel';
import { RunFunction } from '../../types/command';

const name: string = 'createarp';
const description: string = 'Create auto response';
const category: string = "Autoresponse";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const aliases: string[] = ['carp'];
const run: RunFunction = async(client, message, args) => {
    if(args.length == 0) return message.channel.send(client.embed(
        {
            title: 'How to use create auto response',
            description: `Type the command ${"`"}${client.listprefix[message.guild.id] || client.Config.prefix}carp "qestions / trigger" answer / response${"`"}`
        }
    ));

    const trigger = args.join(' ').split('"')[1]
    const response = args.join(' ').split('"')[2].split(' ').slice(1).join(' ')
    
    new autoresponseModel({
        trigger: trigger,
        response: response,
        guildId: message.guild.id
    }).save().then(() => {
        message.channel.send('Success create autoresponse')
    })
}

export { name, description, run, category, aliases, permissionUser }