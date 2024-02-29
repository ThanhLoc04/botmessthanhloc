module.exports.config = {
 name: "anh",
 version: "1.0.3",
 hasPermssion: 0,
 credits: "Tobi",
 description: "Xem ảnh theo yêu cầu của bạn!",
 usages: "phản hồi 1/2/3",
 commandCategory: "Người dùng",
 cooldowns: 5,
 dependencies: {
  axios: ""
 }
}, module.exports.run = async function({
 event: e,
 api: a,
 args: n
}){
 if (!n[0]) return a.sendMessage("    [ 𝑨̉𝑵𝑯 & 𝑯𝑰̀𝑵𝑯 ]\nㅡㅡㅡㅡㅡㅡㅡㅡ\n 1 ➤ 𝑨̉𝒏𝒉 𝑮𝒂́𝒊\n 2 ➤ 𝑨̉𝒏𝒉 𝑻𝒓𝒂𝒊\n 3 ➤ 𝑨̉𝒏𝒉 𝑨𝒏𝒊𝒎𝒆\n 4 ➤ 𝑨̉𝒏𝒉 𝑪𝒐𝒔𝒑𝒍𝒂𝒚\n 5 ➤ 𝑨̉𝒏𝒉 𝑴𝒐̂𝒏𝒈\n 6 ➤ 𝑨̉𝒏𝒉 𝑫𝒖́\nㅡㅡㅡㅡㅡㅡㅡㅡ\n    [ 𝑽𝑰𝑫𝑬𝑶 ]\n 7 ➤ 𝑽𝒊𝒅𝒆𝒐 𝑨𝒏𝒊𝒎𝒆\n 8 ➤ 𝑽𝒊𝒅𝒆𝒐 𝑮𝒂́𝒊\n 9 ➤ 𝑽𝒊𝒅𝒆𝒐 𝑪𝒉𝒊𝒍𝒍\nㅡㅡㅡㅡㅡㅡㅡㅡ\n=> 𝑷𝒉𝒂̉𝒏 𝒉𝒐̂̀𝒊 𝒕𝒉𝒆𝒐 𝒔𝒐̂́ \n=> 𝑲𝒉𝒐̂𝒏𝒈 𝒄𝒐́ 𝒑𝒉𝒊́ 𝒏𝒉𝒂 $$",e.threadID, ((a, n) => {
  global.client.handleReply.push({
   name: this.config.name,
   messageID: n.messageID,
   author: e.senderID,
   type: "create"
  })
 }), e.messageID)
}, module.exports.handleReply = async ({
 api: e,
 event: a,
 client: n,
 handleReply: t,
 Currencies: s,
 Users: i,
 Threads: o,Currencies,
}) => {
    let $ = 0;
    let money = (await Currencies.getData(a.senderID)).money;
    if(money < $)return e.sendMessage(` Cần ${$}$ để xem ảnh`, a.threadID);
    Currencies.decreaseMoney(a.senderID, $);
 var { p, h } = linkanh();

 if ("create" === t.type) {
  const n = (await p.get(h)).data.data;
  let t = (await p.get(n, {
   responseType: "stream"
  })).data;
  if (['10', '11'].includes(a.body))t.path = 'tmp.mp3';
  return e.sendMessage({
   body: "Coi Đi Nhóc \n Đéo Mất Đồng Nào",
   attachment: t
  }, a.threadID, a.messageID)
 }

   function linkanh() {
        const p = require("axios");
        if ("1" == a.body)
          var h = "https://quoc-vong-1.hehehehe001.repl.co/api/gai.php";
      else if ("2" == a.body)
         var h = "https://quoc-vong-1.hehehehe001.repl.co/api/boy.php";
      else if ("3" == a.body)
         var h = "https://apitobi.vipcc.repl.co/api/anime.php";
      else if ("4" == a.body)
          var h = "https://apitobi.vipcc.repl.co/api/cosplay.php";
      else if ("5" == a.body)
          var h = "https://apitobi.vipcc.repl.co/api/mong.php";
      else if ("6" == a.body)
          var h = "https://apitobi.vipcc.repl.co/api/du.php";
     else if ("7" == a.body)
          var h = "https://apitobi.vipcc.repl.co/api/videoanime.php";
     else if ("8" == a.body)
          var h = "https://apitobi.vipcc.repl.co/api/videogai.php";
     else if ("9" == a.body)
          var h = "https://apitobi.vipcc.repl.co/api/videochill.php";
        return { p, h };
    }
};
