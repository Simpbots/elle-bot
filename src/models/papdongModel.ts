import { Schema, model } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890', 10)


const papdongSchema = new Schema({
    link: String,
    guildId: String,
    _id: {
        type: String,
        default: () => nanoid()
    }
}, { timestamps: true });

const papdongModel = model('papdong', papdongSchema)

export default papdongModel