module.exports.config = {
    name: "ship",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "",
    description: "share 1 mdl nào đó cho 1 tv trog group",
    commandCategory: "Admin",
    usages: "/share [reply or tag or để trống] + tên mdl muốn share",
    cooldowns: 0,
    dependencies: {
        "pastebin-api": "",
        "cheerio": "",
        "request": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
  const permission = ["100084329895588",""];
    if (!permission.includes(event.senderID)) return api.sendMessage( "Bạn tuổi Iồn",event.threadID, event.messageID);
    const axios = require('axios');
    const fs = require('fs');
    const request = require('request');
    const cheerio = require('cheerio');
  const picture = (await axios.get(`https://quatangabc.com/vnt_upload/File/Image/share_1.jpg`, { responseType: "stream"})).data;
  const moment = require("moment-timezone");
  const hmm = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
const uid = event.type == 'message_reply' ? event.messageReply.senderID: !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0]: !!args[0] ? args[0]: event.senderID  ;
    const { join, resolve } = require("path");
    const { senderID, threadID, messageID, messageReply, type } = event;
    var name = args[0];
    if (type == "message_reply") {
        var text = messageReply.body;
    }
    if(!text && !name) return api.sendMessage({body: `📝==「 𝗦𝗛𝗔𝗥𝗘 𝗥𝗜𝗘̂𝗡𝗚 𝗠𝗗𝗟 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ 𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${hmm} 
👉 𝗕𝗮̣𝗻 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗿𝗲𝗽𝗹𝘆 𝗼𝗿 𝘁𝗮𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗺𝘂𝗼̂́𝗻 𝘀𝗵𝗮𝗿𝗲`, attachment: (picture)},threadID, messageID);
    //(!text && name) {
        var data = fs.readFile(
          `./modules/commands/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage({body: `📝==「 𝗦𝗛𝗔𝗥𝗘 𝗥𝗜𝗘̂𝗡𝗚 𝗠𝗗𝗟 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ 𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${hmm} 
𝗜'𝗺 𝘀𝗼𝗿𝘆 𝗺𝗱𝗹 ${args[0]} 𝗺𝗮̀ 𝗯𝗮̣𝗻 𝗰𝗮̂̀𝗻 𝗵𝗶𝗲̣̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝘁𝗿𝗲̂𝗻 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝗰𝘂̉𝗮 ${global.config.BOTNAME}`, attachment: (picture)}, threadID, messageID);
            const { PasteClient } = require('pastebin-api')
            const client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
        api.sendMessage(`📝==「 𝗦𝗛𝗔𝗥𝗘 𝗥𝗜𝗘̂𝗡𝗚 𝗠𝗗𝗟 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${hmm} 
💼 𝗧𝗲̂𝗻 𝗹𝗲̣̂𝗻𝗵: ${args.join("")} 
━━━━━━━━━━━━━━━━━━━━━
👉 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝘀𝗵𝗮𝗿𝗲 𝗿𝗶𝗲̂𝗻𝗴 𝗺𝗼̣̂𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 
💓 𝗖𝗵𝗲𝗰𝗸 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗯𝗼𝘁 𝗼̛̉ 𝘀𝗽𝗮𝗺 đ𝗲̂̉ 𝗹𝗮̂́𝘆 𝗺𝗱𝗹`, threadID, messageID);
            api.sendMessage({body: `📝==「 𝗦𝗛𝗔𝗥𝗘 𝗥𝗜𝗘̂𝗡𝗚 𝗠𝗗𝗟 」==📝
━━━━━━━━━━━━━━━━━━━━━
⏰ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${hmm}
💓 𝗟𝗶𝗻𝗸 𝗠𝗱𝗹: ${link} 
🔰 𝗧𝗲̂𝗻 𝗹𝗲̣̂𝗻𝗵: ${args.join("")}

👉 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 đ𝘂̛𝗼̛̣𝗰 𝗮𝗱𝗺𝗶𝗻 𝘀𝗵𝗮𝗿𝗲 𝗿𝗶𝗲̂𝗻𝗴 𝗺𝗼̣̂𝘁 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 `,attachment: (picture)}, uid)
          }
        );
        return
}