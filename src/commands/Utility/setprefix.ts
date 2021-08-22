import { RunFunction } from '../../types/command';
import prefixModel from '../../models/prefixModel';
import { PermissionResolvable } from 'discord.js-light';

const name: string = 'setprefix';
const description: string = 'set prefix';
const category: string = "Utility";
const permissionUser: PermissionResolvable = ['ADMINISTRATOR'];
const run: RunFunction = async(client, message, args) => {
    if(!Object.keys(client.listprefix).includes(message.guild.id)) {
        new prefixModel({ prefix: args[0], guildId: message.guild.id }).save()
            .then(e => {
                return message.channel.send(`Success change prefix to ${"`"}${args[0]}${"`"}`)
            })
            .catch(err => {
                console.error(err)
                return message.channel.send('Failed set prefix')
            })
    }else if(Object.keys(client.listprefix).includes(message.guild.id)) {
        prefixModel.where({ guildId: message.guild.id }).findOneAndUpdate({ $set: { prefix: args[0] } })
            .then(e => {
                return message.channel.send(`Success change prefix to ${"`"}${args[0]}${"`"}`)
            })
            .catch(err => {
                console.error(err)
                return message.channel.send('Failed set prefix')
            })
    }
}

export { name, description, run, category, permissionUser }