module.exports.config = {
	name: "ngaytaofb",
	version: "1.0.7",
	hasPermssion: 0,
	credits: "Raiden Shogun",
	description: "Tìm ngày giờ tạo nick facebook",
	commandCategory: "Tiện ích",
	usages: "seachdatefb id",
	cooldowns: 5
};
module.exports.run = async ({ api, event, args }) =>
{
  const axios = require("axios");
  if (!args[0]) return api.sendMessage("Vui lòng nhập id cần tìm", event.threadID, event.messageID);
  const res = await axios.get(`https://golike.com.vn/func-api.php?user=${args.join(" ")}`);
  if (res.status == 200) {
  const finduid = res.data.data.uid
  const finddate = res.data.data.date
  return api.sendMessage(`🌐==== [ 𝐂𝐇𝐄𝐂𝐊 𝐅𝐁 ] ====🌐\n━━━━━━━━━━━━━━\n\n📌 𝗜𝗗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${finduid}\n📆 𝗡𝗴𝗮̀𝘆 𝘁𝗮̣𝗼: ${finddate}\n\n- 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝘅𝗮̀𝗶 𝗯𝗼𝘁 𝘃𝘂𝗶 𝘃𝗲̉ 💓\n- 𝗧𝗼𝗼𝗹 𝗖𝗵𝗲𝗰𝗸 𝗙𝗕 𝗕𝘆 𝗭𝗲𝘂𝘀𝗗𝘇 🌸`, event.threadID, event.messageID);
  }
  else {
    return api.sendMessage(`[ #224 ] - Lỗi`, event.threadID, event.messageID);
  }
}