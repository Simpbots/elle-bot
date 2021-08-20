import { RunFunction } from '../../types/command';
import { EditSnipe } from '../../types/editsnipe';

const name: string = 'editsnipe';
const description: string = 'Return edited message';
const category: string = "Fun";
const run: RunFunction = async (client, message) => {
    const themessages: EditSnipe = client.editsnipes.get(message.channel.id);
    if (!themessages) return message.channel.send("There's nothing to snipe")
    const embed = client.embed({ description: `***Before:*** ${themessages.messageOld.content}\n***After:*** ${themessages.messageNew.content}`})
        .setAuthor(themessages.messageNew.author.tag, themessages.messageNew.author.displayAvatarURL({ dynamic: true, size: 256 }))
        .setTimestamp(themessages.messageNew.createdAt)
    return message.channel.send(embed)
}

export { name, description, run, category }