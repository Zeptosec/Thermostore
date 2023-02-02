import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
import * as dotenv from 'dotenv';
dotenv.config();
client.login(process.env.TOKEN);

/**
 * 
 * @param {File} file the file to save
 * @returns link to saved file
 */
export async function saveFile(file) {
    if (client.isReady) {
        let chan = client.channels.cache.find(c => c.id === process.env.CHANNEL_ID);
        let msg;
        if (!chan) return null;
        else {
            msg = await chan.send({
                files: [{
                    attachment: file.data,
                    name: "blob"
                }]
            })
        }
        let uploaded = await msg.attachments.map(a => a.url);
        return uploaded[0];
    } else {
        console.log("not ready");
        return null;
    }
}