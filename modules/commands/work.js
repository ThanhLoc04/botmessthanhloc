/*
@credit ⚡️D-Jukie
@vui lòng không chỉnh sửa credit
*/
const atm = []
const rd = Math.floor(Math.random() * atm.length);
const fs = require("fs");
module.exports.config = {
    name: "work",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "⚡D-Jukie", // Code working của diện,trun and Sang mod
    description: "Là Working nhưng nhiều công việc hơn",
    commandCategory: "game",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 0 
    },
    denpendencies: {
        "fs": "",
        "request": ""
}
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "work.gif")) request("https://i.imgur.com/sJw4gds.gif").pipe(fs.createWriteStream(dirMaterial + "work.gif"));
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
var coinscn = Math.floor(Math.random() * 100000) + 200; //random coins khi làm ở khu công nghiệp
var coinsdv = Math.floor(Math.random() * 170000) + 100; //random coins khi làm ở khu dịch vụ
var coinsmd = Math.floor(Math.random() * 300000) + 400; //random coins khi làm ở mỏ dầu
var coinsq = Math.floor(Math.random() * 200000) + 90; //random coins khi khai thác quặng
var coinsdd = Math.floor(Math.random() * 50000) + 500; //random coins khi đào đá
var coinsdd1 = Math.floor(Math.random() * 400000) + 1000; //random coins khi đào đá
var coinsex2 = Math.floor(Math.random() * 300000) + 420;
  var coinsktf = Math.floor(Math.random() * 300000) + 4200;
//random ku dài
var rdcn = ['giết được 𝟭 𝗞𝗶𝗹𝗹', 'giết được 𝟱 𝗞𝗶𝗹𝗹', 'giết được 𝟯 𝗞𝗶𝗹𝗹', 'giết được 𝟭𝟵 𝗞𝗶𝗹𝗹', 'giết được 𝟭𝟴 𝗞𝗶𝗹𝗹', ' giết được 𝟯 𝗞𝗶𝗹𝗹', '𝗧𝗼𝗽𝟭 𝗩𝗼̛́𝗶 𝟬 𝗞𝗶𝗹𝗹'];
var work1 = rdcn[Math.floor(Math.random() * rdcn.length)];   

var rddv = ['𝗖𝗮̀𝘆 𝗧𝗵𝘂𝗲̂', '𝗟𝗮𝘂 𝗡𝗵𝗮̀', '𝗶̣ 𝗧𝗵𝘂𝗲̂', '𝗕𝘂𝘀𝗰𝘂', '𝗙𝗶𝘅 𝗠𝗼𝗱𝘂𝗹𝗲𝘀', '𝗗𝗶𝗲̂̃𝗻 𝗞𝗶̣𝗰𝗵', '𝗖𝗼̂𝗻𝗴 𝗖𝗵𝘂́𝗮'];
var work2 = rddv[Math.floor(Math.random() * rddv.length)]; 

var rdmd = ['𝗫𝟮 𝗚𝗼̂̃', '𝗫𝟴 𝗚𝗼̂̃', '𝗫𝟭𝟵 𝗚𝗼̂̃', '𝗫𝟭 𝗚𝗼̂̃', '𝗫𝟵𝟵𝟵 𝗚𝗼̂̃', '𝗫𝟭𝟮 𝗚𝗼̂̃', '𝗫𝟰 𝗚𝗼̂̃'];
var work3 = rdmd[Math.floor(Math.random() * rdmd.length)]; 

var rdq = ['𝗞𝗶𝗲̂́𝗺 𝗦𝗮̆́𝘁', '𝗞𝗶𝗲̂́𝗺 𝗞𝗶𝗺 𝗖𝘂̛𝗼̛𝗻𝗴', '𝗞𝗶𝗲̂́𝗺 𝗖𝗵𝗶̀', '𝗞𝗶𝗲̂́𝗺 𝗡𝗲𝘁𝗵𝗲𝗿', '𝗞𝗶𝗲̂́𝗺 𝗚𝗼̂̃', '𝗞𝗶𝗲̂́𝗺 𝗩𝗮̀𝗻𝗴', '𝗞𝗶𝗲̂́𝗺 𝗖𝘂'];
var work4 = rdq[Math.floor(Math.random() * rdq.length)]; 

var rddd = ['viết xong đoạn code html', 'viết được đoạn code thiết kế website', 'viết được đoạn code tình yêu rồi', 'viết được code js '];
var work5 = rddd[Math.floor(Math.random() * rddd.length)]; 

var rddd1 = ['vẽ được bước tranh như cc', 'vẽ được bước tranh tuyệt đẹp'];
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];

  var rdex1 = ['giết người ', 'giết bà hàng xóm ', 'giết ông hàng xóm', 'giết chú lao công'];
var work7 = rdex1[Math.floor(Math.random() * rdex1.length)];
var msg = "";
    switch(handleReply.type) {
      case "choosee": {
          //thêm ["https://i.imgur.com/2n1MeWb.jpeg" ,   [ https://i.imgur.com/2n1MeWb.jpeg
            switch(event.body) {
                 case "1": msg = `Bạn đã ${work1} nên đã nhận về ${coinscn}$`;
 attachment = global.utils.streamUrl('https://i.imgur.com/3AguwgA.jpeg');
                break;       
             case "2": msg = `Bạn đã ${work2} nên đã nhận về ${coinsdv}$`;
                attachment = global.utils.streamUrl('https://i.imgur.com/2n1MeWb.jpeg');
                break;
                 case "3": msg = `Bạn đã ${work3} nên đã nhận về ${coinsmd}$`; 
                attachment = global.utils.streamUrl('https://i.imgur.com/NsRNuNu.jpeg');
                break;
                case "4": msg = `Bạn đã  ${work4} nên đã nhận về ${coinsq}$`
                attachment = global.utils.streamUrl('https://i.imgur.com/0K9ifpt.jpeg'); 
                break;
                case "5": msg = `Bạn đã ${work5} nên đã được nhận về ${coinsdd}$` ;
               attachment = global.utils.streamUrl('https://i.imgur.com/zQCF4IU.jpeg');
               break;
               case "6": msg = `Bạn đã ${work6} nên đã nhận về ${coinsdd1}$`;
               attachment = global.utils.streamUrl('https://i.imgur.com/QUwUqw2.jpeg');
               break;
               case "7": msg = `Bạn đã ${work7} nên đã nhận về ${coinsex2}$`;
               attachment = global.utils.streamUrl('https://i.imgur.com/qPGaysx.jpeg');
               break;
            }; 
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("⚡️Vui lòng nhập 1 con số", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("⚡️Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️Update soon...";
            };
            return api.sendMessage({body: msg, attachment: await attachment}, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  
    event:e, 
    api, 
    handleReply, 
    Currencies }) => {
    const { threadID, messageID, senderID } = e;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    var   t = Date.parse("February 1, 2022") - Date.parse(new Date()),
    d = Math.floor( t/(1000*60*60*24) ),
    h = Math.floor( (t/(1000*60*60)) % 24 ),
    m = Math.floor( (t/1000/60) % 60 );

    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            seconds = ((time % 60) / 6).toFixed(0); 
        return api.sendMessage(`hôm nay bạn đã làm việc rồi nên là bạn hãy cút đi :)))))))`, e.threadID, e.messageID); // Đoạn này ae có thể để quay lại sau${seconds}giây
    }
    else {    
        var msg = {
            body: "💟==KIẾM TIỀN BOT==💟" +
                "\n1.⚔️ Bắn free fire" +
                "\n2.🏢 Làm thuê" +
                "\n3.🪵 Chặt gỗ" +
                "\n4.🛠️ Rèn kiếm" +
                "\n5.🖊️ Viết code " +
                "\n6.✍️ vẽ tranh" +
                "\n7.🗡️ Giết người🤦" +
                "\n𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘃𝗮̀ 𝗰𝗵𝗼̣𝗻 𝘁𝗵𝗲𝗼 𝘀𝗼̂́" //thêm hiển thị case tại đây ||  \n[number]. [Ngành nghề]" +
                ,
                attachment: fs.createReadStream(__dirname + `/cache/work.gif`)}
                return api.sendMessage(msg,e.threadID,  (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: e.senderID,
            messageID: info.messageID
          })  
        })
    }
  }