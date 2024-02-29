module.exports.config = {
  name: "spamban",
  version: "1.0.0",
  hasPermssion: 0, 
  credits: "NTKhang",//Mod by H.Thanh
  description: "Tự động ban người dùng nếu spam bot ( random ảnh )",
  commandCategory: "Hệ thống",
  usages: "Tự động bị ban",
  cooldowns: 5
};

module.exports.run = ({api, event}) => {
  return api.sendMessage("𝗦𝗣𝗔𝗠𝗕𝗢𝗧 - Bạn sẽ bị ban nếu spam Bot", event.threadID, event.messageID);
};
module.exports.handleEvent = async ({ Users, api, event})=> {
  const fs = require("fs-extra");
  const moment = require("moment-timezone"); 
  let { senderID, messageID, threadID } = event;
  const threadInfo = await api.getThreadInfo(event.threadID)
    var threadName = threadInfo.threadName||"Tên không tồn tại";
  var time = moment.tz("Asia/Ho_Chi_minh").format("DD/MM/YYYY HH:mm:ss");
  const so_lan_spam = 10; // số lần spam, vượt quá sẽ bị ban
  const thoi_gian_spam = 120000; // 60000 millisecond (1 phút)
  const unbanAfter = 180000000; // 600000 millisecond (10 phút) 
  const folderRandomImage = __dirname + "/trogiup/menu";
  const allImage = fs.readdirSync(folderRandomImage);
  if (!global.client.autoban) global.client.autoban = {};
  if (!global.client.autoban[senderID]) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  };

  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  const prefix = threadSetting.PREFIX || global.config.PREFIX;
  if (!event.body || event.body.indexOf(prefix) != 0) return; 
  let dataUser = await Users.getData(senderID) || {};
  let data = dataUser.data || {};

  if ((global.client.autoban[senderID].timeStart + thoi_gian_spam) <= Date.now()) {
    global.client.autoban[senderID] = {
      timeStart: Date.now(),
      number: 0
    }
  }
  else {
    global.client.autoban[senderID].number++;
    if (global.client.autoban[senderID].number >= so_lan_spam) {
      const moment = require("moment-timezone");
      if (data && data.banned == true) return;
      data.banned = true;
      data.reason = `• Spam ${so_lan_spam} lần/${thoi_gian_spam/60000} phút`;
      data.autoban = {
        timeStart: Date.now(),
        unbanAfter
      };
      data.dateAdded = time;
      await Users.setData(senderID, { data });
      global.data.userBanned.set(senderID, { reason: data.reason, dateAdded: data.dateAdded });
      global.client.autoban[senderID] = {
        timeStart: Date.now(),
        number: 0
      };
      api.sendMessage({
        body: "[🌸] 𝗧𝗲̂𝗻: " + dataUser.name + "\n[🎀] 𝗜𝗗: " + senderID + `\n➣ 𝗕𝗶̣ 𝗰𝗮̂́𝗺 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗕𝗼𝘁 ${unbanAfter/60000} 𝗽𝗵𝘂́𝘁 𝘃𝗼̛́𝗶 𝗹𝗶́ 𝗱𝗼 𝘀𝗽𝗮𝗺 𝗕𝗼𝘁 𝟭𝟬 𝗹𝗮̂̀𝗻/𝟮 𝗽𝗵𝘂́𝘁\n➣ 𝗛𝗮̃𝘆 𝗻𝗼́𝗶 𝗹𝗼̛̀𝗶 𝘁𝗿𝗮̆𝗻 𝘁𝗿𝗼̂́𝗶 𝘁𝗼̛́𝗶 𝗔𝗱𝗺𝗶𝗻, 𝗕𝗼𝘁 𝘀𝗲̃ 𝗮𝘂𝘁𝗼 𝗴𝗼̛̃ 𝗯𝗮𝗻 ${Math.floor(unbanAfter/60000)} 𝗽𝗵𝘂́𝘁 𝗻𝘂̛̃𝗮\n𝗡𝗲̂́𝘂 𝗹𝗮̀ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗾𝘂𝗲𝗻 𝗵𝗮̃𝘆 𝗶𝗻𝗯𝗼𝘅 𝗮𝗱𝗺𝗶𝗻 𝘀𝗵𝗼𝘄 𝗱𝘂́ 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗴𝗼̛̃ 𝗯𝗮𝗻 𝘀𝗼̛́𝗺 💌\nhttps://www.facebook.com/toanchill2005\n[⏰] 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${time}\n[📲] 𝗚𝘂̛̉𝗶 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝗼̛́𝗶 𝗰𝗮́𝗰 𝗔𝗱𝗺𝗶𝗻 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴`,
        attachment: fs.createReadStream(`${folderRandomImage}/${allImage[Math.floor(Math.random()*allImage.length)]}`)}, threadID, () => {
          setTimeout(async function() {
            delete data.autoban;
            data.banned = false;
            data.reason = null;
            data.dateAdded = null;
            await Users.setData(senderID, { data });
            global.data.userBanned.delete(senderID);
              api.sendMessage("➣ 𝐀𝐮𝐭𝐨 𝐠𝐨̛̃ 𝐛𝐚𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐜𝐡𝐨 " + dataUser.name + "\n➣ 𝐁𝐢̣ 𝐛𝐚𝐧 𝐯𝐚̀𝐨 𝐥𝐮́𝐜 " + time +  ` 𝐛𝐨̉ 𝐜𝐚́𝐢 𝐭𝐚̣̂𝐭 𝐬𝐩𝐚𝐦 𝐧𝐡𝐞́\n𝐌𝐚̃𝐢 𝐘𝐞̂𝐮𝐮𝐮 ❤️`, threadID); //mod by toàn
        }, unbanAfter);
        });
        for (let idAdmin of global.config.ADMINBOT) {
        api.sendMessage(`◆━━ 𝐁𝐎𝐓 𝐓𝐇𝐎̂𝐍𝐆 𝐁𝐀́𝐎 ━━◆\n\n[🚫] 𝗣𝗵𝗮̣𝗺 𝗻𝗵𝗮̂𝗻 𝘀𝗽𝗮𝗺 ${so_lan_spam} 𝗹𝗮̂̀𝗻/2 𝗽𝗵𝘂́𝘁\n[🔰] 𝗧𝗲̂𝗻: ${dataUser.name} \n[⚠️] 𝗜𝗗: ${senderID}\n[🎟️] 𝗡𝗮𝗺𝗲𝗕𝗼𝘅: ${threadName} \n[💬] 𝗜𝗗 𝗕𝗼𝘅: ${threadID}\n[⏰] 𝗟𝘂́𝗰: ${time}` ,idAdmin);
      };
    }
  }
};