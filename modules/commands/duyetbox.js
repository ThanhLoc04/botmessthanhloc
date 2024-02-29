module.exports.config = {
  name: "duyetbox",
  version: "1.0.2",
  hasPermssion: 1,
  credits: "DungUwU",
  description: "duyệt box dùng bot xD",
  commandCategory: "Thanh Loc",
  cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
}

module.exports.run = async ({ event, api, args }) => {
  const { threadID, messageID, senderID } = event;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let msg = "";
  let idBox = (args[0]) ? args[0] : threadID;
  if (args[0] == "list") {
    var inbox = await api.getThreadList(100, null, ['INBOX']);
    let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);

    var listthread = [];

    //////////


    for (var groupInfo of list) {
      //const botID = api.getCurrentUserID();
      const listUserID = event.participantIDs.filter(ID => ID);

      listthread.push({
        id: groupInfo.threadID,
        name: groupInfo.name,
        sotv: listUserID.length,
      });

    } //for

    var listbox = listthread.sort((a, b) => {
      if (a.sotv > b.sotv) return -1;
      if (a.sotv < b.sotv) return 1;
    });

    let msg = 'DANH SÁCH CÁC NHÓM ĐƯỢC PHÊ DUYỆT\n━━━━━━━━━━━━━━━━━━\n',
      i = 1;
    var groupid = [];
    for (var group of listbox) {
      msg += `${i++}. ${group.name}\n→ TID: ${group.id}\n\n`;
      groupid.push(group.id);
    }

    api.sendMessage(msg, event.threadID, (e, data) =>
      global.client.handleReply.push({
        name: this.config.name,
        author: event.senderID,
        messageID: data.messageID,
        groupid,
        type: 'reply'
      })
    );
  }
  else if (args[0] == "del") {
    idBox = (args[1]) ? args[1] : event.threadID;
    if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID, messageID);
    if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID, messageID);
    api.sendMessage("Box đã bị gỡ khỏi danh sách được phép dùng bot", threadID, () => {
      data.splice(data.indexOf(idBox), 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }, messageID)
  }
  else if (isNaN(parseInt(idBox))) api.sendMessage("ID bạn nhập không hợp lệ", threadID, messageID);
  else if (data.includes(idBox)) api.sendMessage(`Box ${group.name} đã được phê duyệt từ trước!`, threadID, messageID);
  else api.sendMessage("Kích Hoạt Thành công!", idBox, (error, info) => {
    api.changeNickname(`「 ${global.config.PREFIX} 」 • ${(!global.config.BOTNAME) ? "Quốc Vòng" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
    else {
      data.push(idBox);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      api.sendMessage(`Phê duyệt thành công box:\n${idBox}`, threadID, messageID);
    }
  });
}