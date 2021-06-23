import Glob from 'glob';
import consola, { Consola } from 'consola';
import { promisify } from 'util';
import { Client, Message, Collection, Intents, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import { Config } from './types/config';
import { Command } from './types/command';
import { Event } from './types/event';
import { Autoresponse } from './types/autoresponse';
import mongoose from 'mongoose';
import prefixModel from './models/prefixModel';
import autoresponseModel from './models/autorepsonseModel';
import papdongModel from './models/papdongModel';

class Bot extends Client {
    public globPromise = promisify(Glob);
    public listprefix: object = {};
    public autoresponseobject: object = {};
    public papdong: object = {};
    public pausearp: boolean = false;
    public Config: Config;
    public logger: Consola = consola;
    public snipes: Collection<string, Message> = new Collection();
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public constructor() {
        super({ ws: { intents: Intents.ALL } })
    }
    public async start(config: Config): Promise<any> {
        this.Config = config;
        this.login(config.token);

        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(e => this.logger.success('Connected to database'))
            .catch(err => this.logger.error(err))


        prefixModel.find({}, (err, docs) => {
            this.listprefix = {}
            if(err) {
                console.error('Erorr fetching prefix config')
            }
            docs.forEach(a => {
                // @ts-ignore
                this.listprefix[a.guildId] = a.prefix
            })
        })


        prefixModel.watch().on('change', change => {
            if(change.operationType == 'insert') {
                this.listprefix[change.fullDocument.guildId] = change.fullDocument.prefix;
            }
            if(change.operationType == 'update') {
                prefixModel.findById(change.documentKey['_id'], (err, docs) => {
                    if(err) {
                        console.error(err)
                    }
                    this.listprefix[docs.guildId] = docs.prefix
                })
            }
            if(change.operationType == 'delete') {
                prefixModel.find({}, (err, docs) => {
                    this.listprefix = {}
                    if(err) {
                        console.error('Erorr fetching prefix config')
                    }
                    docs.forEach(a => {
                        // @ts-ignore
                        this.listprefix[a.guildId] = a.prefix
                    })
                })
            }
        })

        autoresponseModel.watch().on('change', change => {
            if(change.operationType == 'delete' || change.operationType == 'update' || change.operationType == 'insert') {             
                autoresponseModel.find({}, (err, docs: Autoresponse[]) => {
                    if(err) {
                        console.error(err)
                    }

                    this.guilds.cache.forEach(x => {
                        this.autoresponseobject[x.id] = []
                    })

                    docs.forEach(x => {
                        const tempdata = {}
                        tempdata[x.trigger] = x.response
                        this.autoresponseobject[x.guildId] = {...this.autoresponseobject[x.guildId], ...tempdata}
                    })
                })
            }
        })

        autoresponseModel.find({}, (err, docs: Autoresponse[]) => {
            if(err) {
                console.error(err)
            }

            this.guilds.cache.forEach(x => {
                this.autoresponseobject[x.id] = []
            })

            docs.forEach(x => {
                const tempdata = {}
                tempdata[x.trigger] = x.response
                this.autoresponseobject[x.guildId] = {...this.autoresponseobject[x.guildId], ...tempdata}
             })
        })

        papdongModel.find({}, (err, docs: string[]) => {
            if(err) {
                console.error(err)
            }
            this.papdong = {}
            this.guilds.cache.forEach(x => {
                // @ts-ignore
                this.papdong[x.id] = docs.filter(a => a.guildId == x.id)
            })
        })
        
        papdongModel.watch().on('change', change => {
            papdongModel.find({}, (err, docs: string[]) => {
                if(err) {
                    console.error(err)
                }
                
                this.papdong = {}
                this.guilds.cache.forEach(x => {
                    // @ts-ignore
                    this.papdong[x.id] = docs.filter(a => a.guildId == x.id)
                })
            })
        })

        const commandFiles: string[] = await this.globPromise(`${__dirname}/commands/**/*{.ts,.js}`);
        console.log('=== COMMANDS ===')
        commandFiles.map(async(value: string) => {
            const file: Command = await import(value);
            this.commands.set(file.name, file);
            this.logger.info(`Success load command: ${file.name}`);
        });
        const eventFiles: string[] = await this.globPromise(`${__dirname}/events/*{.ts,.js}`);
        console.log('=== EVENTS ===')
        eventFiles.map(async(value: string) => {
            const file: Event = await import(value);
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
            this.logger.info(`Success load event: ${file.name}`);
        });
    }
    public embed(options: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({ ...options, color: '#C884FF' }).setTimestamp().setFooter(this.user.username);
    }
}

export { Bot }