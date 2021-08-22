import Glob from 'glob';
import consola, { Consola } from 'consola';
import { promisify } from 'util';
import { Client, Message, Collection, MessageEmbed, MessageEmbedOptions, HexColorString } from 'discord.js-light';
import { Config } from './types/config';
import { Command } from './types/command';
import { Event } from './types/event';
import mongoose from 'mongoose';
import { EditSnipe } from './types/editsnipe';

class Bot extends Client {
    public globPromise = promisify(Glob);
    public listprefix: object = {};
    public autoresponseobject: object = {};
    public papdong: object = {};
    public pausearp: boolean = false;
    public pausepap: boolean = false;
    public Config: Config;
    public logger: Consola = consola;
    public snipes: Collection<string, Message> = new Collection();
    public editsnipes: Collection<string, EditSnipe> = new Collection();
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public constructor() {
        super({ intents: 32767 })
    }
    public async start(config: Config): Promise<any> {
        this.Config = config;
        this.login(config.token);

        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(e => this.logger.success('Connected to database'))
            .catch(err => this.logger.error(err))


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
        return new MessageEmbed({ ...options, color: String(process.env.color) as HexColorString }).setTimestamp().setFooter(this.user.username);
    }
}

export { Bot }
