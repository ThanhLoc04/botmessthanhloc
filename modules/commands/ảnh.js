module.exports.config = {
 name: "ảnh",
 version: "1.0.3",
 hasPermssion: 0,
 credits: "",
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
}) {
 if (!n[0]) return a.sendMessage("  [ 𝐀̉𝐧𝐡 & 𝐇𝐢̀𝐧𝐡 ]\n    ✿✿✿✿✿✿\n 1 ➤ 𝐀̉𝐧𝐡 𝐆𝐚́𝐢\n 2 ➤ 𝐀̉𝐧𝐡 𝐌𝐨̂𝐧𝐠\n 3 ➤ 𝐀̉𝐧𝐡 𝐓𝐫𝐚𝐢\n 4 ➤ 𝐀̉𝐧𝐡 𝐆𝐚́𝐢 𝐍𝐡𝐚̣̂𝐭\n 5 ➤ 𝐀̉𝐧𝐡 𝐒𝐞𝐱\n    ✿✿✿✿✿✿\n    [ 𝐕𝐈𝐃𝐄𝐎 ]\n 6 ➤ 𝐕𝐢𝐝𝐞𝐨 𝐂𝐡𝐢𝐥𝐥\n 7 ➤ 𝐕𝐢𝐝𝐞𝐨 𝐒𝐞𝐱\n 8 ➤ 𝐕𝐢𝐝𝐞𝐨 𝐀𝐧𝐢𝐦𝐞\n 9 ➤ 𝐕𝐢𝐝𝐞𝐨 𝐆𝐚́𝐢\n    ✿✿✿✿✿✿\n     𝐕𝐎𝐈𝐂𝐄\n    ✿✿✿✿✿✿\n10 ➤ 𝐕𝐨𝐢𝐜𝐞 𝐁𝐮𝐨̂̀𝐧\n11 ➤ 𝐕𝐨𝐢𝐜𝐞 𝐇𝐚́𝐭\n    ✿✿✿✿✿✿\n=> Phản hồi theo số \n=> Phí xem mỗi hình ảnh là 0$!", e.threadID, ((a, n) => {
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
   body: "Của bạn đây\nvà bạn dell mất đồng nào",
   attachment: t
  }, a.threadID, a.messageID)
 }

   function linkanh() {
        const p = require("axios");
        if ("1" == a.body)
          var h = "https://api-1.longbui19.repl.co/api1/ap.php";
      else if ("2" == a.body)
         var h = "https://quoc-vong-1.hehehehe001.repl.co/api/mong.php";
      else if ("3" == a.body)
         var h = "https://quoc-vong-1.hehehehe001.repl.co/api/boy.php";
      else if ("4" == a.body)
          var h = "https://quoc-vong-1.hehehehe001.repl.co/api/gainhat.php";
      else if ("5" == a.body)
          var h = "https://api-1.longbui19.repl.co/api1/ap.php";
      else if ("6" == a.body)
          var h = "https://quoc-vong-1.hehehehe001.repl.co/api/videochill.php";
      else if ("7" == a.body)
          var h = "https://api.longbui19.repl.co/api1/ap.php";
      else if ("8" == a.body)
          var h = "https://api-3.longbui19.repl.co/api1/ap.php ";
      else if ("9" == a.body)
          var h = "https://quoc-vong-1.hehehehe001.repl.co/api/videogai.php";
      else if ("10" == a.body)
          var h = "https://quoc-vong-1.hehehehe001.repl.co/api/voicebuon.php";
      else if ("11" == a.body)
          var h = "https://quoc-vong-1.hehehehe001.repl.co/api/voicehat.php";
      else if ("12" == a.body)
          var h = "https://api-trankhuong.trankhuong-tk-jiang-2000.repl.co/images/cosplay";
      else if ("13" == a.body)
          var h = "https://api-trankhuong.trankhuong-tk-jiang-2000.repl.co/images/cosplaylq";
      else if ("14" == a.body)
          var h = "https://api-trankhuong.trankhuong-tk-jiang-2000.repl.co/images/cosplaytc";
      else if ("15" == a.body)
          var h = "https://api-trankhuong.trankhuong-tk-jiang-2000.repl.co/images/skinlq";
      else if ("16" == a.body)
          var h = "https://api-trankhuong.trankhuong-tk-jiang-2000.repl.co/images/skintc";
        return { p, h };
    }
};