import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../types/command';
import { Message } from 'discord.js'
import papdongModel from '../../models/papdongModel';

const name: string = 'resetpap';
const description: string = 'reset pap dong';
const category: string = "Pap dong";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const run: RunFunction = async(client, message) => {
    message.channel.send(`Are you sure about reset the pap dong? type ${"`"}confirm${"`"}`)
        .then(e => {
            const fillter = (m: Message) => m.content.toLowerCase() == 'confirm' && m.author.id == message.author.id;
            message.channel.awaitMessages(fillter, { max: 1, time: 60000, errors: ['time'] })
                .then(() => {
                    papdongModel.deleteMany({ guildId: message.guild.id })
                        .then(() => {
                            return e.edit('Success reset autoresponse')
                        })
                        .catch(err => {
                            console.log(err)
                            return e.edit('Failed reset autoresponse')
                        })
                })
        })
}

export { name, description, run, category, permissionUser }