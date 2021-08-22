import { PermissionResolvable } from 'discord.js-light';
import papdongModel from '../../models/papdongModel';
import { RunFunction } from '../../types/command';

const name: string = 'listpap';
const description: string = 'List pap';
const category: string = "Pap dong";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const run: RunFunction = async(client, message, args) => {
     papdongModel.find({ guildId: message.guild.id }, (err, docs) => {
        if(err) {
            message.channel.send('Error fetching pap dong database')
        }
        if(!args[0] && isNaN(args[0])) {
                    if(docs.length != 0) {
                        return message.channel.send(client.embed({
                            title: "Here's list of pap dong in this guild",
                            // @ts-ignore
                            description: `${(docs.slice(0, 10)).map(x => (`_${x.link}_ - ${"`"}${x['_id']}${"`"}`)).join('\n')}`
                        }).setFooter(`Page 1/${Math.ceil(docs.length / 9)}`))
                    }else {
                        return message.channel.send(client.embed({
                            title: "***There's no pap dong saved***"
                        }))
                    }
                }else {
                    if(docs.length != 0) {
                        return message.channel.send(client.embed({
                            title: "Here's list of pap dong in this guild",
                            // @ts-ignore
                            description: `${(docs.slice(10*Number(args[0]) - 10, 10*Number(args[0]))).map(x => (`_${x.link}_ - ${"`"}${x['_id']}${"`"}`)).join('\n')}`
                        }).setFooter(`Page ${args[0]}/${Math.ceil(docs.length / 9)}`))
                    }else {
                        return message.channel.send(client.embed({
                            title: "***There's no pap dong saved***"
                        }))
                    }
                }
    })
}

export { name, description, run, category, permissionUser }