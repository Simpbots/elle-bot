import { Schema, model } from 'mongoose'
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890', 10)

const autoresponseSchema = new Schema({
    _id: {
        type: String,
        default: () => nanoid()
    },
    trigger: String,
    response: String,
    guildId: String
}, { timestamps: true });

autoresponseSchema.index({ "deleted": 1 }, { expireAfterSeconds: 0 })

const autoresponseModel = model('autoresponse', autoresponseSchema)

export default autoresponseModel