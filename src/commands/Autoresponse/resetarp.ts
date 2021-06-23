import { PermissionResolvable } from 'discord.js';
import autoresponseModel from '../../models/autorepsonseModel';
import { Autoresponse } from '../../types/autoresponse';
import { RunFunction } from '../../types/command';
import { Message } from 'discord.js'

const name: string = 'resetarp';
const description: string = 'reset auto response';
const category: string = "Autoresponse";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const aliases: string[] = ['rarp'];
const run: RunFunction = async(client, message) => {
    message.channel.send(`Are you sure about reset the autoresponse? type ${"`"}confirm${"`"}`)
        .then(e => {
            const fillter = (m: Message) => m.content.toLowerCase() == 'confirm' && m.author.id == message.author.id;
            message.channel.awaitMessages(fillter, { max: 1, time: 60000, errors: ['time'] })
                .then(() => {
                    autoresponseModel.deleteMany({ guildId: message.guild.id })
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

export { name, description, run, category, aliases, permissionUser }