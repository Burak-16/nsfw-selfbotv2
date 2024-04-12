const { Client } = require("discord.js-selfbot-v13");
const {
  JsonDatabase,
} = require("wio.db");

const db = new JsonDatabase({
databasePath:"./nudeseks.json"
});

const { BOT } = require("./Config")

const client = new Client({
  checkUpdate: false,
});

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

client.login(BOT.token);
client.setMaxListeners(30);

client.on("messageCreate", async (message) => {
  if(BOT.owners.includes(message.author.id)) {
    if(message.content.startsWith("!kanalayarla")) {
      let splitted = message.content.split(" ");
      
      let alinacakanal = splitted[1];
      let gonderileceknala = splitted[2];

      db.set(`${alinacakanal}`, gonderileceknala);

      await message.channel.send({ content: `<#${alinacakanal}> Bu kanala gonderilen medialar otomatik olarak <#${gonderileceknala}> gonderilecek`})
    }
  };
  if(db.has(`${message.channelId}`)) {
    if(message.attachments) {
      if(message.attachments.size > 0) {
        message.attachments.forEach(async attahc => {
         await client.channels.cache.get(await db.get(`${message.channelId}`)).send({ content: `${attahc.url}` });
         await sleep(500);
        })
      }
    }
  }
});

const express = require('express');
const { channel } = require("diagnostics_channel");
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Power By FastUptime'));

app.listen(port, () =>
    console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)
);