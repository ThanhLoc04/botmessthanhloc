  module.exports.config = {
    name: "bank",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Judas,fix nhẹ(tobi)",
    description: "Ngân hàng tài chính",
    commandCategory: "Kiếm tiền",
    usages: "bank",
    cooldowns: 3
  };
  const laisuat = 0.005
  const timeIM = 3600
  async function makeimg(i){
    console.log(i)
    const x = `${i}`
     const fs = require('fs');
  const axios = require('axios')
   if(!fs.existsSync(__dirname+'/main/SplineSans-Medium.ttf')) { 
        let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
         fs.writeFileSync(__dirname+"/main/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
      };
      if(!fs.existsSync(__dirname+'/main/SplineSans.ttf')) { 
        let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
         fs.writeFileSync(__dirname+"/main/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
      };
      const { loadImage, createCanvas, registerFont } = require("canvas");
      let path = __dirname + "/main/atmaraxy.png";
      let bg = (await axios.get(`https://imgur.com/wrS74gQ.jpg`, {responseType: "arraybuffer" })).data;
      fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
      let bgBase = await loadImage(path);
      let canvas = createCanvas(bgBase.width, bgBase.height);
      let ctx = canvas.getContext("2d");
      const Canvas = global.nodemodule["canvas"];
      ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
      registerFont(__dirname+`/main/SplineSans-Medium.ttf`, {
          family: "SplineSans-Medium"
      });
      registerFont(__dirname+`/main/SplineSans.ttf`, {
          family: "SplineSans"
      });
      ctx.font = "50px SplineSans-Medium";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.fillText('' + `${i}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ', 530, 359);
      const imageBuffer = canvas.toBuffer();
      fs.writeFileSync(path, imageBuffer);
      return path;
  }
  function replace(i) {
    var u = `${i}`
    var x = u.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return x
  }
  module.exports.onLoad = function({ }) {
    const { existsSync, writeFileSync } = require('fs-extra')
    const { join } = require('path');
    const pathData = join(__dirname, "main", "bankmirai.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8");
  }
  module.exports.run = async ({ event, api, Currencies, args, Users, permssion }) => {
    const axios = require('axios')
    var msg = [];
    var date = new Date();
    var duocsui = date.getDay();
    const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD:MM:YYYY");
    const stk = String(Math.floor(Math.random() * (900000000)) + 1000000)
    const { threadID, messageID, senderID, mentions } = event;
    const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
    var lozz = (await Users.getData(senderID)).name
    const { join } = require("path")
    const pathData = join(__dirname, "main", "bankmirai.json");
    const user = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var userData = dataJson.find(item => item.senderID == senderID) || { senderID: senderID, name: lozz, money: 500000, stk: stk, time: timeNow, status: true, vay: { solan: 0, davay: false, sotien: 0, noxau: false, time: "" } };
    const moneyUser = (await Currencies.getData(senderID)).money
    if (duocsui == "9") {
      return api.sendMessage(`[ WARNING ] ➜ Nay CN không làm việc đâu`, threadID, messageID)
    }
    if (args[0] == '-r' || args[0] == 'register') {
      if (!dataJson.some(i => i.senderID == senderID)) {
        dataJson.push(userData);
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        return api.sendMessage(`[ SUCCESS ] ➜ Bạn đã đăng kí thành công, số tài khoản của bạn là ${stk}, chúng tôi cho bạn 500000$ và sau đó bạn phải gửi ít nhất 500000$ để có lãi💰\n[ ${timeNow} ]`, threadID, messageID)
      }
      else return api.sendMessage(`[ WARNING ] ➜ Bạn đã có tài khoản trên hệ thống MIRAI Bank🏦`, threadID, messageID)
    }
    if (args[0] == "vay") {
      if (userData.vay.solan == 5 || userData.status == false) { return api.sendMessage(`[ WARNING ] ➜ Bạn đã ${userData.vay.solan == 5 ? "đạt số lần vay là 5" : "dính nợ xấu"} nên không thể tiếp tục vay`, threadID, messageID) }
      if (!dataJson.find(i => i.senderID == senderID)) { return api.sendMessage(`[ WARNING ] ➜ Bạn chưa có tài khoản trên hệ thống MIRAI Bank🏦\n[ ${timeNow} ]`, threadID) }
      if (isNaN(args[1]) || !args[1]) { return api.sendMessage(`[ WARNING ] ➜ Số tiền bạn nhập không chính xác`, threadID) }
      if (args[1] < 500000 || args[1] > 50000000000000) { return api.sendMessage(`[ WARNING ] ➜ Số tiền bạn nhập ${args[1] < 500000 ? "Nhỏ Hơn" : "Lớn Hơn"} mức yêu cầu vay của chúng tôi`, threadID) }
      else {
        return api.sendMessage("[ BANKING ] ➜ Vui Lòng React Tin Nhắn Này Để Xác Thực Thông Tin", threadID,
          async (err, info) => {
            global.client.handleReaction.push({
              thread: event.threadID,
              type: "vay",
              name: this.config.name,
              money: args[1],
              author: senderID,
              messageID: info.messageID
            });
          })
      }
    }
    if (args[0] == "trả") {
      if (!dataJson.find(i => i.senderID == senderID)) { return api.sendMessage(`[ WARNING ] ➜ Bạn chưa có tài khoản trên hệ thống MIRAI Bank🏦\n[ ${timeNow} ]`, threadID) }
      if (isNaN(args[1]) || !args[1]) { return api.sendMessage(`[ WARNING ] ➜ Số tiền bạn nhập không chính xác`, threadID) }
      const tra_v = parseInt(userData.vay.sotien) - parseInt(args[1]);
      if (tra_v < -1) { return api.sendMessage(`[ WARNING ] ➜ Số tiền bạn trả cho khoản vay của bạn lớn hơn số tiền bạn đã vay trước đó vui lòng trả đủ ${replace(parseInt(userData.vay.sotien))}$`, threadID, messageID) }
      if (userData.vay.sotien == 0) { return api.sendMessage('[ WARNING ] ➜ Đã trả hết nợ', threadID) }
      else {
        return api.sendMessage("[ BANKING ] ➜ Vui Lòng React Tin Nhắn Này Để Xác Thực Thông Tin", threadID,
          async (err, info) => {
            global.client.handleReaction.push({
              thread: event.threadID,
              type: "tra",
              name: this.config.name,
              money: args[1],
              author: senderID,
              messageID: info.messageID
            });
          })
      }
    }
    if (args[0] == 'all' || args[0] == '-a') {
      for (let stt in dataJson) {
        var title = dataJson[stt].stk;
        var name = dataJson[stt].name;
        var sender = dataJson[stt].senderID;
        msg += `[🐧]➜ Chủ: ${name}\n[🐧]➜ SenderID: ${sender}\n[🐧]➜ STK: ${title}\n=====================\n`
      }
      return api.sendMessage({ body: msg }, event.threadID);
    }
    if (args[0] == "gửi" || args[0] == "send") {
      var money = args[1];
      if (!money || money < 50 || isNaN(money)) return api.sendMessage("[ BANKING ] ➜ Vui Lòng Nhập Đúng Số Tiền", threadID, messageID);
      if (moneyUser < money) return api.sendMessage(`[ BANKING ] ➜ Số Dư Không Đủ Để GD`, threadID, messageID);
      if (!userData) { return api.sendMessage('[ BANKING ] ➜ Bạn Chưa Đăng Ký Ngân Hàng', threadID, messageID) }
      else {
        return api.sendMessage("[ BANKING ] ➜ Vui Lòng React Tin Nhắn Này Để Xác Thực Thông Tin", threadID,
          async (err, info) => {
            global.client.handleReaction.push({
              thread: event.threadID,
              type: "send",
              name: this.config.name,
              send: money,
              author: senderID,
              messageID: info.messageID
            });
          })
      }
    }
    if (args[0] == "rút") {
      var money = args[1];
      if (!money || money < 500000 || isNaN(money)) return api.sendMessage("[ BANKING ] ➜ Vui Lòng Nhập Đúng Số Tiền", threadID, messageID);
      if (userData.money < money) return api.sendMessage(`[ BANKING ] ➜ Số Dư Không Đủ Để GD`, threadID, messageID);
      if (!userData) { return api.sendMessage('[ BANKING ] ➜ Bạn Chưa Đăng Ký Ngân Hàng', threadID, messageID) }
      else {
        return api.sendMessage("[ BANKING ] ➜ Vui Lòng React Tin Nhắn Này Để Xác Thực Thông Tin", threadID,
          async (err, info) => {
            global.client.handleReaction.push({
              thread: event.threadID,
              type: "rut",
              name: this.config.name,
              send: money,
              author: senderID,
              messageID: info.messageID
            });
          })
      }
    }
    if (args[0] == "top") {
      var i = 0
      var option = parseInt(1000);
      var data, msg = "";
      dataJson.sort((a, b) => {
        if (a.money > b.money) return -1;
        if (a.money < b.money) return 1;
      })
      if (dataJson.length < option) option = dataJson.length;
      for (const dataUser of dataJson) {
        if (i == option) break;
        msg += `[🐧]➜ Top ${i + 1}\n[🐧]➜ Name: ${dataUser.name}\n[🐧]➜ UID: ${dataUser.senderID}\n[🐧]➜ STK: ${dataUser.stk}\n[🐧]➜ Với ${replace(dataUser.money)}$\n===================\n`;
        i += 1;
      }
      return api.sendMessage(msg, threadID)
    }
    if (args[0] == 'pay' || args == '-p') {
      var userStk = dataJson.find(i => i.stk == args[1])
      if (!userStk) return api.sendMessage('[ WARNING ] ➜ Not Found', threadID, messageID)
      else {
        return api.sendMessage('[ BANKING ] ➜ Vui Lòng Reply Tin Nhắn Để Nhập Số Tiền Muốn Chuyển', threadID, (error, info) => {
          return global.client.handleReply.push({
            name: this.config.name,
            type: "pay",
            messageID: info.messageID,
            author: senderID,
            stk: userStk.stk
          })
          messageID
        })
      }
    }
    if (args[0] == 'check' || args[0] == 'coins') {
      if (Object.keys(event.mentions).length == 1) {
        var mention = (Object.keys(mentions))[0];
        var users = dataJson.find(item => item.senderID == mention)
        if (!dataJson.find(i => i.senderID == mention)) return api.sendMessage('[ WARNING ] ➜ Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID)
        return api.sendMessage(`[ WARNING ] ➜ Bạn Không Phải Chủ Nhân Của Tài Khoản Này Vì Vậy Nếu Bạn Muốn Xem Thông Tin Tài Khoản Này Thì Kêu ${users.name} Tài Khoản React Này Đi`, threadID, (error, info) => {
          return global.client.handleReaction.push({
            name: this.config.name,
            type: "check",
            messageID: info.messageID,
            author: mention,
          })
          messageID
        })
      }
      else {
        if (!dataJson.find(i => i.senderID == senderID)) { return api.sendMessage('[ WARNING ] ➜ Người dùng chưa đăng kí sử dụng banking, banking register để đăng kí🏦', threadID, messageID) }
        var userMoney = userData.money;
        var userStk = userData.stk;
        return makeimg(userMoney).then(path => api.sendMessage({ body: `[ SUCCESS ] ➜ Số tiền bạn đang gửi MIRAI Bank là: ${replace(userMoney)}$\n➜ Ngày Tham Gia: ${userData.time}\n➜ Xác Thực ${userData.status}\n➜ Số tài khoản là: ${userStk}\n➜ Lãi: +${laisuat * 100}% trong ${12000 / 60} phút`, attachment: createReadStream(path) }, threadID, () => unlinkSync(path), messageID));
      }
    } else {
      const t = (await axios.get(`https://imgur.com/I8Vxc8z.png`, {
        responseType: "stream"
      })).data;
  
      return api.sendMessage({
        body: "[🐧]=== 『 MIRAI BANK 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n➜ register - đăng ký miraibank\n➜ send - gửi tiền vào miraibank để có lãi\n➜ rút - rút tiền từ miraibank\n➜ check - xem thông tin banking\n➜ pay - chuyển tiền cho người khác\n➜ vay - vay nợ (không khuyến khích)\n➜ trả - trả nợ",
        attachment: t
      }, threadID)
    }
  }
  module.exports.handleReply = async function({ api, event, args, handleReply, Threads, Users, Currencies }) {
    if (handleReply.author !== event.senderID) return
    const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
    const { join } = require("path")
    const pathData = join(__dirname, "main", "bankmirai.json");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var userData = dataJson.find(item => item.senderID == event.senderID)
    if (!event.body || event.body < 50 || isNaN(event.body)) return api.sendMessage("[ BANKING ] ➜ Vui Lòng Nhập Đúng Số Tiền", event.threadID);
    if (userData.money < event.body) return api.sendMessage(`[ BANKING ] ➜ Số Dư Không Đủ Để GD`, event.threadID);
    return api.sendMessage(`[ BANKING ] ➜ Bạn đã nhập số tiền cần chuyển là ${replace(event.body)}, react tin nhắn này để hoàn thành giao dịch`, event.threadID, (err, info) => {
      if (err) console.log(err)
      return global.client.handleReaction.push({
        name: this.config.name,
        type: "pay",
        money: event.body,
        author: handleReply.author,
        stk: handleReply.stk,
        messageID: info.messageID
      })
      messageID
    })
  }
  module.exports.handleReaction = async function({ event, api, handleReaction, Currencies, Users }) {
    try {
      api.unsendMessage(handleReaction.messageID);
      const moment = require("moment-timezone");
      var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm - DD:MM:YYYY");
      var timeva = moment.tz("Asia/Ho_Chi_Minh").format("DD:MM:YYYY");
      if (handleReaction.author != event.userID) return
     const { readFileSync, writeFileSync, unlinkSync, createReadStream } = require("fs-extra");
      const { join } = require("path")
      const pathData = join(__dirname, "main", "bankmirai.json");
      var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
      var userData = dataJson.find(item => item.senderID == handleReaction.author)
      var userMoney = userData.money;
      var userstk = userData.stk;
      var money = userData.money;
      if (handleReaction.type == "check") {
        return makeimg(userMoney).then(path => api.sendMessage({ body: `[ SUCCESS ] ➜ Số tiền ${userData.name} đang gửi MIRAI Bank là: ${replace(userMoney)}$\n➜ Ngày Tham Gia: ${userData.time}\n➜ Xác Thực ${userData.status}\n➜ Số tài khoản là: ${userstk}\n➜ Lãi: +${laisuat * 100}% trong ${12000 / 60} phút`, attachment: createReadStream(path) }, event.threadID, () => unlinkSync(path), event.messageID));
      }
      if (handleReaction.type == "send") {
        userData.money = parseInt(userMoney) + parseInt(handleReaction.send);
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        await Currencies.decreaseMoney(event.userID, parseInt(handleReaction.send))
        return api.sendMessage(`[ SUCCESS ] ➜ Bạn đã gửi ${replace(handleReaction.send)}$ vào MIRAI Bank\n💷 Lãi: +${laisuat * 100}% trong ${timeIM / 60} phút\n[ ${timeNow} ]`, event.threadID)
      }
      if (handleReaction.type == "rut") {
        userData.money = parseInt(userMoney) - parseInt(handleReaction.send);
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        await Currencies.increaseMoney(event.userID, parseInt(handleReaction.send))
        return api.sendMessage(`[ SUCCESS ] ➜ Bạn đã rút ${replace(handleReaction.send)}$ từ MIRAI Bank\n[ ${timeNow} ]`, event.threadID)
      }
      if (handleReaction.type == "pay") {
        var userStk = dataJson.find(i => i.stk == handleReaction.stk)
        var lmao = userStk.money;
        userStk.money = parseInt(lmao) + parseInt(handleReaction.money);
        userData.money = parseInt(money) - parseInt(handleReaction.money)
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        return api.sendMessage(`[ SUCCESS ] ➜ Chuyển tiền thành công ${replace(parseInt(handleReaction.money))}$, số dư còn lại là ${replace(parseInt(money) - parseInt(handleReaction.money))}$\n\n━━━━━━━━━━━━━━━━━━\n[ ${timeNow} ]`, event.threadID)
      }
      if (handleReaction.type == "vay") {
        if (userData.vay.solan == 0) {
          userData.vay.davay = true
          userData.vay.time = `${timeva}`
          userData.vay.sotien = parseInt(userData.vay.sotien) + parseInt(handleReaction.money)
          userData.vay.solan = parseInt(userData.vay.solan) + 1
        } else {
          userData.vay.sotien = parseInt(userData.vay.sotien) + parseInt(handleReaction.money)
          userData.vay.solan = parseInt(userData.vay.solan) + 1
        }
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        await Currencies.increaseMoney(event.userID, parseInt(handleReaction.money))
        return api.sendMessage(`[ SUCCESS ] ➜ Vay tiền thành công ${replace(parseInt(userData.vay.sotien))}$`, event.threadID)
      }
      if (handleReaction.type == "tra") {
        if ((parseInt(userData.vay.sotien) - parseInt(handleReaction.money)) == 0) {
          userData.vay.davay = false
          userData.vay.time = ""
          userData.vay.sotien = parseInt(userData.vay.sotien) - parseInt(handleReaction.money)
          userData.vay.solan = 0
        } else {
          userData.vay.sotien = parseInt(userData.vay.sotien) - parseInt(handleReaction.money)
        }
        writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
        await Currencies.decreaseMoney(event.userID, parseInt(handleReaction.money))
        return api.sendMessage(`[ SUCCESS ] ➜ Trả vay tiền thành công ${replace(parseInt(userData.vay.sotien))}$`, event.threadID)
      }
    } catch (e) {
      console.log(e)
    }
  }
  /////////////////////////////////////////////////////////
  async function nhantien() {
    const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
    const { join, resolve } = require('path');
    const pathData = join(__dirname, "main", "bankmirai.json");
    const user = require('./main/bankmirai.json');
    if (user[0] == undefined) return
    while (true) {
      for (let id of user) {
        var userData = user.find(i => i.senderID == id.senderID);
        var money = userData.money;
        userData.money = (parseInt(money + money * laisuat))
        writeFileSync(pathData, JSON.stringify(user, null, 2));
      }
      await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
    }
  }
  async function vay() {
    const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
    const { join, resolve } = require('path');
    const pathData = join(__dirname, "main", "bankmirai.json");
    const user = require('./main/bankmirai.json');
    if (user[0] == undefined) return
    while (true) {
      for (let id of user) {
        var userData = user.find(i => i.senderID == id.senderID);
        if (userData.vay.davay == true) {
          var money = userData.vay.sotien;
          userData.vay.sotien = (parseInt(money + money * 0.05))
          writeFileSync(pathData, JSON.stringify(user, null, 2));
        }
      }
      await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
    }
  }
  async function checkvay() {
    const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
    const { join, resolve } = require('path');
    const pathData = join(__dirname, "main", "bankmirai.json");
    const user = require('./main/bankmirai.json');
    if (user[0] == undefined) return
    while (true) {
      for (let id of user) {
        var userData = user.find(i => i.senderID == id.senderID);
        const gb = userData.vay.time.split("/")
        const t = Date.parse(new Date()) - Date.parse(`${gb[1]} ${gb[0]}, ${gb[2]} 00:00:00`)
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        if (userData.vay.davay == true) {
          if (days == 7) {
            userData.status = false
            userData.vay.noxau = true
            userData.vay.sotien = (parseInt(money + money * 0.05))
            writeFileSync(pathData, JSON.stringify(user, null, 2));
          }
        }
      }
      await new Promise(resolve => setTimeout(resolve, `${timeIM}` * 1000))
    }
  }
  nhantien();
  vay();
  checkvay();