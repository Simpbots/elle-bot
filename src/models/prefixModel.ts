import { Schema, model } from 'mongoose'

const prefixSchema = new Schema({
    prefix: String,
    guildId: String
}, { timestamps: true });

const prefixModel = model('prefix', prefixSchema)

export default prefixModel