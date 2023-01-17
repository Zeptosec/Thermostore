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
        let msg = await client.channels.cache.get(process.env.CHANNEL_ID).send({
            files: [{
                attachment: file.data,
                name: "blob"
            }]
        })
            .catch(console.error);
        let uploaded = await msg.attachments.map(a => a.url);
        return uploaded[0];
    } else {
        console.log("not ready");
        return null;
    }
}