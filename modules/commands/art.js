const axios = require("axios");
module.exports.config = {
    name: "art",
    version: "1.0.0",
    hasPermssion: 0,
    credits: 'Dũngkon',
    description: "",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0,
        'image-downloader': '',
        'tslib': '',
        'imgur': '',
        'request': '',
        'axios': ''

    }
const {ImgurClient} = require('imgur');
const {image} = require('image-downloader');
const {createReadStream, unlinkSync} = require('fs-extra');
const {get} = require('request');
module.exports.run = async function ({ api, event, args, Users, Currencies, Threads }) {
  try {
      let axiso = require("axios")
let fs = require("fs-extra")
    let path = __dirname + "/cache/meitu.png"
let pathVideo = __dirname + "/cache/meitu.mp4"
let link = await global.nodemodule["tinyurl"].shorten( event.messageReply.attachments[0].url || args.join(" "));
    if (!args[0]) {
        api.sendMessage("====『 𝗔𝗥𝗧 』====\n━━━━━━━━━━━━\n➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̛̀, 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝗱𝗮𝗻𝗴 𝘅𝘂̛̉ 𝗹𝗶́ 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂!", event.threadID)
let dungkon = await axios.get(`https://web.duongkum999.tech/meitu/image-v2?url=${link}`)
  await global.utils.downloadFile(dungkon.data.image, path)
      var cc = `
 
====『 𝗔𝗥𝗧 』====\n━━━━━━━━━━━━\n➜ 𝗔̉𝗻𝗵 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗱𝗮̂𝘆 :𝟯\n➜𝗟𝗶𝗻𝗸 𝗮̉𝗻𝗵: ${dungkon.data.image}
`
   api.sendMessage({body: cc, attachment: fs.createReadStream(path)}, event.threadID, event.messageID)
  }
 if (args[0] == "video") {
    api.sendMessage("====『 𝗔𝗥𝗧 』====\n━━━━━━━━━━━━\n➜ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̛̀, 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝗱𝗮𝗻𝗴 𝘅𝘂̛̉ 𝗹𝗶́ 𝘆𝗲̂𝘂 𝗰𝗮̂̀𝘂!", event.threadID)
let res = await axios.get(`https://web.duongkum999.tech/meitu/video?url_1==${link}`)
let cc = await axios.get(`https://stingray-app-chpom.ondigitalocean.app/meitu-video?type=7&url_1=${link}&url_2=${res.data.image}`)
await global.utils.downloadFile(cc.data.video, pathVideo)
   var dungkon = `
====『 𝗔𝗥𝗧 』====\n━━━━━━━━━━━━\n➜ 𝗔̉𝗻𝗵 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗱𝗮̂𝘆 :𝟯\n➜𝗟𝗶𝗻𝗸 𝘃𝗶𝗱𝗲𝗼: ${cc.data.video}
`
api.sendMessage({body: dungkon, attachment: fs.createReadStream(pathVideo)}, event.threadID, event.messageID)
    } 
  } catch(e) {
    console.log(e)
      api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại", event.threadID)
  }
  }