const lossMoney = 100000;
const winMoney = 1000000;

module.exports.config = {
  name: "linkword",
  version: "2.0.7",
  hasPermssion: 0,
  credits: "JRT",
  description: "Chơi nối từ với Bot hoặc thành viên trong nhóm",
  commandCategory: "game",
  usages: "noitu [on/off]",
  cooldowns: 5
};

module.exports.onLoad = function () {
  if (typeof global.moduleData == "undefined")
    global.moduleData = new Object();
  if (typeof global.moduleData.noitu == "undefined")
    global.moduleData.noitu = new Map();
};

module.exports.handleEvent = async function ({ api, event, Currencies }) {
  if (typeof global.moduleData.noitu == "undefined")
    return;
  if (event.senderID == api.getCurrentUserID()) return;
  const axios = global.nodemodule["axios"];
  const { body: word, threadID, messageID } = event;
  if (global.moduleData.noitu.has(threadID)) {
    if (word && word.split(" ").length != 2)
      return;
    if (global.moduleData.noitu.get(threadID).author != event.senderID)
      return;
    const latestWord = global.moduleData.noitu.get(threadID).latestWord;
    if (latestWord && latestWord[latestWord.length - 1] != word[0]) {
      global.moduleData.noitu.delete(threadID);
      await Currencies.decreaseMoney(event.senderID, lossMoney);
      return api.sendMessage(`『 🌸 』➜ Bạn đã thua và mất ${lossMoney}$`, threadID, messageID);
    }
    const data = (await axios.get("https://docs-api.jrtxtracy.repl.co/game/linkword?word=" + encodeURIComponent(word))).data;
    if (data.data == false) {
      global.moduleData.noitu.delete(threadID);
      await Currencies.decreaseMoney(event.senderID, lossMoney);
      return api.sendMessage(`『 🌸 』➜ Bạn đã thua và mất ${lossMoney}$`, threadID, messageID);
    }
    if (data.data.win == true) {
      global.moduleData.noitu.delete(threadID);
      await Currencies.increaseMoney(event.senderID, winMoney);
      return api.sendMessage(`『 🌸 』➜ Bạn đã thắng và nhận được ${winMoney}$`, threadID, messageID);
    }
    global.moduleData.noitu.set(threadID, {
      author: event.senderID,
      latestWord: data.data.text
    });
    return api.sendMessage(data.data.text, threadID, messageID);
  }
};

module.exports.run = function ({ api, event }) {
  const { threadID, messageID } = event;
  if (!global.moduleData.noitu.has(threadID)) {
    global.moduleData.noitu.set(threadID, {
      author: event.senderID,
      latestWord: ""
    });
    return api.sendMessage("Đã bật nối từ", threadID, messageID);
  }
  else {
    global.moduleData.noitu.delete(threadID);
    return api.sendMessage("Đã tắt nối từ", threadID, messageID);
  }
};