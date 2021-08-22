import { PermissionResolvable } from 'discord.js-light';
import papdongModel from '../../models/papdongModel';
import { RunFunction } from '../../types/command';

const name: string = 'importfromold';
const description: string = 'Import from old bot';
const category: string = "Pap dong";
const permissionUser: PermissionResolvable[] = ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'];
const run: RunFunction = async(client, message, args) => {
   if(message.author.id != '402680485731500032') return message.channel.send('Only can be use by the owner of the bot')
    const linkpap = [
        'https://cdn.discordapp.com/attachments/807127938775515137/823359755800150016/image0.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823359756001345577/image1.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823359756223119380/image2.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823359756545949726/image3.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823359756831948830/image4.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823359836892168192/image0.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823360131906404372/image0.jpg',
        'https://media.discordapp.net/attachments/798733258765500436/816655084670025728/Screenshot_20210303-163028_Instagram.jpg?width=411&height=513',
        'https://media.discordapp.net/attachments/798733258765500436/816654824954789938/Photo_on_02-06-20_at_10.45.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364523741937684/Photo_on_05-03-21_at_17.01_4.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364524039471124/Photo_on_05-03-21_at_17.01_5.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364524308299806/Photo_on_04-03-21_at_10.18_2.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364648769552464/image0-1-1.jpg?width=288&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364649290432512/4-up_on_11-05-20_at_13.10_5_compiled.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364895663456268/4-up_on_16-02-21_at_16.05_compiled-5.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823364895876841542/4-up_on_13-06-20_at_00.36_compiled.jpg?width=770&height=513',
        'https://cdn.discordapp.com/attachments/807127938775515137/823360885640265728/image0.jpg',
        'https://cdn.discordapp.com/attachments/807127938775515137/823361098148479006/image0.png',
        'https://media.discordapp.net/attachments/820201748487602226/823741149046243338/Photo_on_08-05-20_at_09.35_2.jpg?width=770&height=513',
        'https://media.discordapp.net/attachments/820201748487602226/823741148656304128/Photo_on_08-05-20_at_09.35.jpg?width=770&height=513',
        "https://media.discordapp.net/attachments/798733258765500436/827920301727809556/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/828451406003306516/image0.jpg?width=344&height=612",
        "https://cdn.discordapp.com/attachments/798733258765500436/828452554236231720/video0.mov",
        "https://media.discordapp.net/attachments/798733258765500436/837576781338771456/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/835432879362277376/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/835432858616201216/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/835023931202207754/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834784600147361864/image0.png?width=345&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/834784546284896311/image0.jpg?width=345&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/834420555557503036/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834420473063931904/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834420423910359060/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834127042504163388/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834126619114602536/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834126196140671067/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834126035771064350/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834125980746121276/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834125935170289734/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834125674817912842/image0.png?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834039818584719370/webcam-toy-photo14.jpg",
        "https://media.discordapp.net/attachments/798733258765500436/834039707444183091/webcam-toy-photo13.jpg",
        "https://media.discordapp.net/attachments/798733258765500436/834002582992715796/4-up_on_07-04-21_at_22.22_compiled.jpg?width=919&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/834002500096098334/Photo_on_19-04-21_at_19.08.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/833677334669295636/webcam-toy-photo7.jpg",
        "https://media.discordapp.net/attachments/798733258765500436/833677305414680646/webcam-toy-photo8.jpg",
        "https://media.discordapp.net/attachments/798733258765500436/833677284350623794/webcam-toy-photo9.jpg",
        "https://media.discordapp.net/attachments/798733258765500436/833677255707197440/webcam-toy-photo10.jpg",
        "https://media.discordapp.net/attachments/798733258765500436/833583119016919050/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/833583006211637248/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/833289827184803850/image0.jpg?width=459&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/833265511802077224/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/833265462677733376/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/833265418533470208/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/807127938775515137/832976239501377566/image0.jpg?width=459&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/832884408197447710/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/832884355503226910/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/832884312683839518/image0.jpg?width=324&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/832883466856169472/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/832883464645640212/image0.jpg?width=324&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/831548354713354331/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/830295549550264350/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/830295492767645736/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/830295445774794813/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/829376589400899634/4-up_on_07-04-21_at_22.22_compiled.jpg?width=919&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/829376428827082802/Photo_on_07-04-21_at_22.22_2.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/829376182319448104/Photo_on_07-04-21_at_22.22_4.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/828451406003306516/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/828451296460668938/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/828451141544837181/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/828450782441373706/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/837585182571495434/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/837585285817696266/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/837585292285968394/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/837585299516162048/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/837585301861171220/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/837585312863617036/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/837585319187578880/image0.jpg?width=919&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/852734375342768148/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/852734350020575243/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/852734337081409546/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/852734322637144144/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/852734143489245225/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/852731927546036224/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/852730922121822269/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/851466720190922772/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/851466598472744960/image0.jpg?width=324&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/851466534085459999/image0.jpg?width=1156&height=613",
        "https://media.discordapp.net/attachments/798733258765500436/850955262751932426/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/850955068730507264/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/850955013890900018/image0.jpg?width=344&height=612",
        "https://media.discordapp.net/attachments/798733258765500436/850954954494443550/image0.jpg?width=344&height=612"
    ]
    linkpap.forEach(x => {
        new papdongModel({
            guildId: message.guild.id,
            link: x
        }).save().catch(err => {
            message.channel.send('Failed save data')
        })
    })
}

export { name, description, run, category, permissionUser }