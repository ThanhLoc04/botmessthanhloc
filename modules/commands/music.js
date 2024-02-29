const fs = require('fs');
const ytdl = require('ytdl-core');
const { resolve } = require('path');
async function downloadMusicFromYoutube(link, path) {
  var timestart = Date.now();
  if(!link) return 'Thiếu link'
  var resolveFunc = function () { };
  var rejectFunc = function () { };
  var returnPromise = new Promise(function (resolve, reject) {
    resolveFunc = resolve;
    rejectFunc = reject;
  });
    ytdl(link, {
            filter: format =>
                format.quality == 'tiny' && format.audioBitrate == 128 && format.hasAudio == true
        }).pipe(fs.createWriteStream(path))
        .on("close", async () => {
            var data = await ytdl.getInfo(link)
            var result = {
                id: data.videoDetails.videoId,
                title: data.videoDetails.title,
                dur: Number(data.videoDetails.lengthSeconds),
                viewCount: data.videoDetails.viewCount,
                likes: data.videoDetails.likes,
                author: data.videoDetails.author.name,
                timestart: timestart,
                publishDate: data.videoDetails.publishDate
            }

            resolveFunc(result)
        })
  return returnPromise
}
module.exports.convertHMS = function(value) {
    const sec = parseInt(value, 10); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60); 
    let seconds = sec - (hours * 3600) - (minutes * 60); 
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours != '00' ? hours +':': '') + minutes+':'+seconds;
}
module.exports.config = {
    name: "music",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Phát nhạc thông qua link YouTube hoặc từ khoá tìm kiếm",
    commandCategory: "Phương tiện",
    usages: "< search/link >",
    cooldowns: 0
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  const moment = require("moment-timezone");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const axios = require('axios')
    const { createReadStream, unlinkSync, statSync } = require("fs-extra")
    try {
        var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
        var data = await downloadMusicFromYoutube('https://www.youtube.com/watch?v=' + handleReply.link[event.body -1], path);
        if (fs.statSync(path).size > 26214400) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB', event.threadID, () => fs.unlinkSync(path), event.messageID);
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage({ 
            body: `======「 𝗠𝗨𝗦𝗜𝗖 」======\n\n→ Tiêu đề: ${data.title}\n→ Tên kênh: ${data.author}\n→ Ngày tải lên: ${data.publishDate}\n→ Thời gian: ${this.convertHMS(data.dur)}\n→ Lượt xem: ${data.viewCount}\n→ Lượt thích: ${data.likes}\n→ Thời gian xử lí: ${Math.floor((Date.now()- data.timestart)/1000)} giây\n→ Link tải: https://www.y2meta.com/vi/youtube/${handleReply.link[event.body -1]}\n\n======= ${time} =======`,
            attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
         event.messageID)

    }
    catch (e) { return console.log(e) }
}
module.exports.run = async function ({ api, event, args }) {
  const moment = require("moment-timezone");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    if (args.length == 0 || !args) return api.sendMessage('Phần tìm kiếm không được để trống', event.threadID, event.messageID);
    const keywordSearch = args.join(" ");
    var path = `${__dirname}/cache/sing-${event.senderID}.mp3`
    if (fs.existsSync(path)) { 
        fs.unlinkSync(path)
    }
    if (args.join(" ").indexOf("https://") == 0) {
        try {
            var data = await downloadMusicFromYoutube(args.join(" "), path);
            if (fs.statSync(path).size > 26214400) return api.sendMessage('Không thể gửi file vì dung lượng lớn hơn 25MB', event.threadID, () => fs.unlinkSync(path), event.messageID);
            return api.sendMessage({ 
                body: `======「 𝗠𝗨𝗦𝗜𝗖 」======\n\n→ Tiêu đề: ${data.title}\n→ Tên kênh: ${data.author}\n→ Thời gian: ${this.convertHMS(data.dur)}\n→ Lượt xem: ${data.viewCount}\n→ Lượt thích: ${data.likes}\n→ Ngày tải lên: ${data.publishDate}\n→ Thời gian xử lí: ${Math.floor((Date.now()- data.timestart)/1000)} giây\n→ Link tải: https://www.y2meta.com/vi/youtube/${data.id}\n\n======= ${time} =======`,
                attachment: fs.createReadStream(path)}, event.threadID, ()=> fs.unlinkSync(path), 
            event.messageID)

        }
        catch (e) { return console.log(e) }
    } else {
          try {
            var link = [],
                msg = "",
                num = 0
            const data = await global.utils.getYoutube(keywordSearch, 'search');
            for (let value of data) {
              link.push(value.id);
              num = num+=1
              msg += (`${num}. ${value.title}\n→ Thời gian: ${value.length.simpleText}\n\n`);
            }
            var body = `→ Có ${link.length} kết quả trùng với từ khoá tìm kiếm của bạn:\n\n${msg}→ Hãy phản hồi tin nhắn này chọn một trong những tìm kiếm trên`
            return api.sendMessage({
              body: body
            }, event.threadID, (error, info) => global.client.handleReply.push({
              type: 'reply',
              name: this.config.name,
              messageID: info.messageID,
              author: event.senderID,
              link
            }), event.messageID);
          } catch(e) {
            return api.sendMessage('Đã xảy ra lỗi, vui lòng thử lại trong giây lát\n' + e, event.threadID, event.messageID);
        }
    }
}