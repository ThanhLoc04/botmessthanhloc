const Canvas = require('canvas');
const axios = require('axios');
const fs = require("fs-extra");
const request = require("request");
const token = 'EAAD6V7os0gcBO3CXxhn58iCB16cZBheH6D0xsZBAyZADVOAaqEhoNjIe0MvtoNOf5TISZCQYCszCqgUbTMuXx1ANyZBiIGX0WrtukdgegjV5A7W5KuxQoZCIXv7RIslHZBHZCVQzrqj8LxfVH66sZCEDFr3LBcT09ZAYsjaxxtW0COv5DwxCPGatUZBZCOa3garhcG9gkgZDZD';
const background = "https://i.imgur.com/zQ7JY17.jpg";

module.exports.config = {
  name: "stalk",
  version: "1.0.0",
  hasPermission: 0,
  credits: `Deku & Yan Maglinte`,
  description: "get info using uid/mention/reply to a message",
  usePrefix: true,
  usages: "[reply/uid/@mention/url]",
  commandCategory: "info",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
  try {
    const timeNow = getCurrentTime();
    let { threadID, senderID, messageID } = event;
    let id;

    if (args.join().includes('@')) {
      id = Object.keys(event.mentions)[0];
    } else if (args[0]) {
      id = args[0];
    } else if (event.type === 'message_reply') {
      id = event.messageReply.senderID;
    } else if (args.join().includes('.com/')) {
      const res = await axios.get(
      `https://api.reikomods.repl.co/sus/fuid?link=${args.join(' ')}`
      );
      id = res.data.result;
    } else {
      id = senderID;
    }
    const userInfo = await api.getUserInfo(id);
    const name = userInfo[id].name;
    const username = userInfo[id].vanity === "unknown" ? "Not Found" : id;
    let body = `❍━[INFORMATION]━❍\n\nName: ${name}\nFacebook URL: https://facebook.com/${username}`
    if (event.messageReply) {
      body += `\nUID User: ${id}\nUID người dùng bot: ${event.senderID}\nThread ID: ${event.threadID}\nBây giờ là: ${timeNow}\n\n❍━━━━━━━━━━━━❍`
    } else if (args.join().includes('@')) {
      body += `\nUID User: ${id}\nUID người dùng bot: ${event.senderID}\nThread ID: ${event.threadID}\nBây giờ là: ${timeNow}\n\n❍━━━━━━━━━━━━❍`
    } else if (args.join().includes('.com/')) {
      body += `\nUID: ${id}\nUID người dùng bot: ${event.senderID}\nThread ID: ${event.threadID}\nBây giờ là: ${timeNow}\n\n❍━━━━━━━━━━━━❍`
    } else {
      const dateCreate = await getCreatedTime(id);
      body += `\nUID: ${id}\nNgày tạo tài khoản: ${dateCreate || 'Chưa có thông tin!'}\nThread ID: ${event.threadID}\nBây giờ là: ${timeNow}\n\n❍━━━━━━━━━━━━❍`
    }
    const profilePicUrl = `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    await new Promise(resolve => request(encodeURI(profilePicUrl))
      .pipe(fs.createWriteStream(__dirname + `/cache/avt.png`))
      .on("close", resolve));
    const profilePic = await Canvas.loadImage(__dirname + `/cache/avt.png`);
    const canvas = Canvas.createCanvas(626, 352);
    const ctx = canvas.getContext('2d');
    const backgroundImage = await Canvas.loadImage(background);
    ctx.drawImage(backgroundImage, 0, 0, 626, 352);
    let size = 250;
    let x = 90;
    let y = (canvas.height - size) / 2;
    ctx.drawImage(profilePic, x, y, size, size);
    let fontSize = 30;
    ctx.font = `${fontSize}px sans-serif`;
    while (ctx.measureText(name).width > size) {
      fontSize -= 2;
      ctx.font = `${fontSize}px sans-serif`;
    }
    let textX = x + size / 2 - ctx.measureText(name).width / 2;
    let textY = y + size + fontSize + 10;
    ctx.fillStyle = "white";
    ctx.fillText(name, textX, textY);
    // lưu
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(__dirname + '/cache/Image.png', buffer);
    return api.sendMessage({
      body: body,
      attachment: fs.createReadStream(__dirname + `/cache/Image.png`)
    }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/Image.png`), event.messageID);
  } catch (err) {
    console.log(err);
    return api.sendMessage(`Error`, event.threadID);
  }
};
function getCurrentTime() {
  const currentTime = new Date();
  const vietnamTime = new Date(currentTime.getTime() + 7 * 60 * 60 * 1000);
  const hours = vietnamTime.getUTCHours().toString().padStart(2, '0');
  const minutes = vietnamTime.getUTCMinutes().toString().padStart(2, '0');
  const seconds = vietnamTime.getUTCSeconds().toString().padStart(2, '0');
  const day = vietnamTime.getUTCDate().toString();
  const month = vietnamTime.getUTCMonth() + 1;
  const year = vietnamTime.getUTCFullYear();

  return `${day} tháng ${month} năm ${year} || ${hours}:${minutes}:${seconds}`;
}

async function getCreatedTime(uid) {
  const { created_time } = (
    await axios.get(`https://fb-created.bangcoi.repl.co/?uid=${uid}&token=${token}`)
  ).data;
  return created_time;
    }