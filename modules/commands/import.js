module.exports.config = {
	name: "import",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "WhoisHakira",
	description: "Lấy tệp json đã cào",
	commandCategory: "Công cụ", 
	usages: "[link]", 
	cooldowns: 0,
};
 const axios = require('axios')
module.exports.run = async function({ api, args, event, permssion }) {
  var o = [];
  const link = args[0];
  const spam = args[1];
  axios.get(encodeURI(link)).then(res => {
     api.sendMessage('[⚜️] ➜ Reply tin nhắn này để nhập type của api\nNếu api là url thì nhập url còn nếu là data thì nhập là data', event.threadID, (err, info) => {
    if(err) console.log(err)
                return global.client.handleReply.push({
                    step: 1,
                    name: this.config.name,
                    link: link,
                    author: event.senderID,
                    messageID: info.messageID
                });
            }, event.messageID) 
  })
}
module.exports.handleReply = async function ({ api, event, args, handleReply, client, __GLOBAL, Threads, Users, Currencies }) {
  try{
    console.log(handleReply)
    api.unsendMessage(handleReply.messageID)
    //console.log(handleReply.step === 1)
  if(handleReply.step === 1){
    return api.sendMessage('[⚜️] ➜ Reply tin nhắn này để nhập số lần crawl', event.threadID, (err, info) => {
       if(err) console.log(err)
                return global.client.handleReply.push({
                    step: 2,
                    name: this.config.name,
                    link: handleReply.link,
                    data: event.body,
                    author: handleReply.author,
                    messageID: info.messageID
                });
            })
  }
  if(handleReply.step == 2){
    var o = [];
    for(let i = 0; i < event.body; i++){
      try{
      const reso = (await axios.get(handleReply.link)).data
        o.push(reso[handleReply.data])
    } catch(e){console.log(e)}}
    return api.sendMessage('[⚜️] ➜ Reaction tin nhắn này để gửi về ib riêng', event.threadID, (err, info) => {
      if(err) console.log(err)
      global.client.handleReaction.push({
        name: this.config.name,
        data: o,
        messageID: info.messageID,
        author: handleReply.author
      })
    })
  }
} catch(e){
    console.log(e)
}}
module.exports.handleReaction = async function ({ api, event, args, handleReaction, client, __GLOBAL, Threads, Users, Currencies }) {
  try{
  api.unsendMessage(handleReaction.messageID);
  const fs = require('fs-extra')
  fs. writeFileSync(`jrt.json`, JSON.stringify(handleReaction.data, null, 4), "utf-8");
  api.sendMessage({body: "", attachment: fs.createReadStream('jrt.json')}, handleReaction.author, () => fs.unlinkSync('jrt.json'))
}catch(e){
    console.log(e)
}}