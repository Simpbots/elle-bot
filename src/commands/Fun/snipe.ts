import { RunFunction } from '../../types/command';

const name: string = 'snipe';
const description: string = 'Return deleted message';
const category: string = "Fun";
const run: RunFunction = async(client, message) => {
    const themessages = client.snipes.get(message.channel.id);
    if(!themessages) return message.channel.send("There's nothing to snipe")
    return message.channel.send(client.embed({ description: themessages.content })
        .setImage(themessages.attachments.first() ? themessages.attachments.first().proxyURL : null)
        .setAuthor(themessages.author.tag, themessages.author.displayAvatarURL({ dynamic: true, size: 256 }))
        .setTimestamp(themessages.createdAt))
}

export { name, description, run, category }