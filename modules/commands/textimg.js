module.exports.config = {
    name: "textimg",
    version: "1.0.0",
    hasPermssion: 0,
    credits: 'ThanhAli',
    description: "Thì như tiêu đề đó",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 0
    }

module.exports.run = async function ({ api, event, args, Users, Currencies, Threads }) {
  try {
const axios = require("axios");
const fs = require("fs-extra");
const {createReadStream, unlinkSync} = require("fs-extra");
const request = require('request');
const path = __dirname + "/cache/textimg.jpg"
const prompt = args.join(" ");
 if (args[0]) {
    api.sendMessage("Đang tải, vui lòng đợi...", event.threadID)
let res = await axios.get(`https://apipremium-thanhali.thanhali.repl.co/texttoimagev2?prompt=${encodeURIComponent(prompt)}`)
await global.utils.downloadFile(res.data.data.url, path)
   var msg = `Ảnh của bạn nè 😗`
api.sendMessage({body: msg, attachment: fs.createReadStream(path)}, event.threadID, event.messageID)
    } 
  } catch(e) {
    console.log(e)
      api.sendMessage("Đã xảy ra lỗi, vui lòng thử lại sau", event.threadID)
  }
}