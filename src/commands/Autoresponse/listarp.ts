import { PermissionResolvable } from 'discord.js-light';
import autoresponseModel from '../../models/autorepsonseModel';
import { Autoresponse } from '../../types/autoresponse';
import { RunFunction } from '../../types/command';

const name: string = 'listarp';
const description: string = 'List auto response';
const category: string = "Autoresponse";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const aliases: string[] = ['larp'];
const run: RunFunction = async(client, message, args) => {
    autoresponseModel.find({ guildId: message.guild.id }, (err, docs: Autoresponse[]) => {
        if(err) {
            message.channel.send('Error fetching autoresponse database')
        }

        if(!args[0] && isNaN(args[0])) {
            if(docs.length != 0) {
                return message.channel.send(client.embed({
                    title: "Here's list of autoresponse in this guild",
                    description: `${(docs.slice(0, 10)).map(x => (`_${x.trigger}: ${x.response}_ - ${"`"}${x['_id']}${"`"}`)).join('\n')}`,
                }).setFooter(`Page 1/${Math.ceil(docs.length / 10)}`))
            }else {
                return message.channel.send(client.embed({
                    title: "***There's no autoresponse saved***"
                }))
            }
        }else {
             if(docs.length != 0) {
                return message.channel.send(client.embed({
                    title: "Here's list of autoresponse in this guild",
                    description: `${(docs.slice(10*Number(args[0]) - 10, 10*Number(args[0]))).map(x => (`_${x.trigger}: ${x.response}_ - ${"`"}${x['_id']}${"`"}`)).join('\n')}`
                }).setFooter(`Page ${args[0]}/${Math.ceil(docs.length / 9)}`))
            }else {
                return message.channel.send(client.embed({
                    title: "***There's no autoresponse saved***"
                }))
            }
        }

    })
}

export { name, description, run, category, aliases, permissionUser }