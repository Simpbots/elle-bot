import { RunFunction } from '../types/event';
import prefixModel from '../models/prefixModel';
import autoresponseModel from '../models/autorepsonseModel';
import papdongModel from '../models/papdongModel';
import { Autoresponse } from '../types/autoresponse';

const name: string = 'ready';
const run: RunFunction = async(client) => {
    prefixModel.find({}, (err, docs) => {
        client.listprefix = {}
        if (err) {
            console.error('Erorr fetching prefix config')
        }
        docs.forEach(a => {
            // @ts-ignore
            client.listprefix[a.guildId] = a.prefix
        })
    })


    prefixModel.watch().on('change', change => {
        if (change.operationType == 'insert') {
            client.listprefix[change.fullDocument.guildId] = change.fullDocument.prefix;
        }
        if (change.operationType == 'update') {
            prefixModel.findById(change.documentKey['_id'], (err, docs) => {
                if (err) {
                    console.error(err)
                }
                client.listprefix[docs.guildId] = docs.prefix
            })
        }
        if (change.operationType == 'delete') {
            prefixModel.find({}, (err, docs) => {
                client.listprefix = {}
                if (err) {
                    console.error('Erorr fetching prefix config')
                }
                docs.forEach(a => {
                    // @ts-ignore
                    client.listprefix[a.guildId] = a.prefix
                })
            })
        }
    })

    autoresponseModel.watch().on('change', change => {
        if (change.operationType == 'delete' || change.operationType == 'update' || change.operationType == 'insert') {
            autoresponseModel.find({}, (err, docs: Autoresponse[]) => {
                if (err) {
                    console.error(err)
                }

                client.guilds.cache.forEach(x => {
                    client.autoresponseobject[x.id] = []
                })

                docs.forEach(x => {
                    const tempdata = {}
                    tempdata[x.trigger] = x.response
                    client.autoresponseobject[x.guildId] = { ...client.autoresponseobject[x.guildId], ...tempdata }
                })
            })
        }
    })

    autoresponseModel.find({}, (err, docs: Autoresponse[]) => {
        if (err) {
            console.error(err)
        }

        client.guilds.cache.forEach(x => {
            client.autoresponseobject[x.id] = []
        })

        docs.forEach(x => {
            const tempdata = {}
            tempdata[x.trigger] = x.response
            client.autoresponseobject[x.guildId] = { ...client.autoresponseobject[x.guildId], ...tempdata }
        })
    })

    papdongModel.find({}, (err, docs: string[]) => {
        if (err) {
            console.error(err)
        }
        client.papdong = {}
        client.guilds.cache.forEach(x => {
            // @ts-ignore
            client.papdong[x.id] = docs.filter(a => a.guildId == x.id)
        })
    })

    papdongModel.watch().on('change', change => {
        papdongModel.find({}, (err, docs: string[]) => {
            if (err) {
                console.error(err)
            }

            client.papdong = {}
            client.guilds.cache.forEach(x => {
                // @ts-ignore
                client.papdong[x.id] = docs.filter(a => a.guildId == x.id)
            })
        })
    })

    client.logger.success(`Logged in as ${client.user.tag}`);
} 

export { name, run }
