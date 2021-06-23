import { Bot } from './client';
import { config } from 'dotenv';
config();

const { token, prefix } = process.env;

new Bot().start({ token, prefix });