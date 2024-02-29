module.exports.config = {
    "name": "menu",
    "version": "1.1.1",
    "hasPermssion": 0,
    "credits": "niiozic",//do setllcredit chứ éo phải do tao:V
    "description": "Xem danh sách nhóm lệnh, thông tin lệnh",
    "commandCategory": "Người dùng",
    "usages": "[...name commands|all]",
    "cooldowns": 5,
    "envConfig": {
        "autoUnsend": {
            "status": true,
            "timeOut": 90
        },
        "sendAttachments": {
            "status": true,
            "random": true,
            "url": "https://qlam-api.trieutaitan3.repl.co/images/phongcanhanime"
        }
    }
};
const {
    autoUnsend = this.config.envConfig.autoUnsend,
    sendAttachments = this.config.envConfig.sendAttachments
} = global.config == undefined ? {}: global.config.menu == undefined ? {}: global.config.menu;
const {
    compareTwoStrings,
    findBestMatch
} = require('string-similarity');
const {
    readFileSync,
    writeFileSync,
    existsSync
} = require('fs-extra');
module.exports.onLoad = function() {
    const dir = __dirname + '/bot/';
    if (!existsSync(dir + 'imagesMenu.json')) writeFileSync(dir + 'imagesMenu.json', '[]');
    
};
module.exports.run = async function({
    api, event, args, Users
}) {
    const {
        sendMessage: send,
        unsendMessage: un
    } = api;
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid
    } = event;
  const moment = require("moment-timezone");
    var l = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  let thR = global.data.threadData.get(tid) || {};
let pr = thR.PREFIX || global.config.PREFIX;
let n = await Users.getNameUser(sid)
let uid = event.senderID;
    const cmds = global.client.commands;
    if (args.length >= 1) {
        if (typeof cmds.get(args.join(' ')) == 'object') {
            const body = infoCmds(cmds.get(args.join(' ')).config);
            const msg = sendAttachments.status ? {
                body,
                attachment: await images()}: body;
            return send(msg, tid, mid);
        } else {
            if (args[0] == 'all') {
                const data = cmds.values();
                var txt = `  M E N U A L L\n` ,
                count = 0;
                for (const cmd of data) txt += ` ${++count}. ${cmd.config.name} \n-> ${cmd.config.description} \n`;
                const msg = sendAttachments.status ? {
                    body: txt
                   // ,attachment: await images()
}: txt;
                send(msg, tid, (a, b) => autoUnsend.status ?setTimeout(v1 => un(v1), 5000*autoUnsend.timeOut, b.messageID): '');
            } else {
                const cmdsValue = cmds.values();
                const arrayCmds= [];
                for (const cmd of cmdsValue) arrayCmds.push(cmd.config.name);
                const similarly = findBestMatch(args.join(' '), arrayCmds);
                if (similarly.bestMatch.rating >= 0.3) return send(`「 MENU BOT 」\n[💞] ➜ Lệnh ${args.join("")} bạn vừa dùng hiện không có mặt trong hệ thống menu bot\n[🧸] ➜ Lệnh gần giống với lệnh bạn vừa dùng là: "${similarly.bestMatch.target}" ?`, tid, mid);
                  /*for (const cmd of cmdsValue) if (compareTwoStrings(args.join(' '), cmd.config.name) >= 0.3) return send(`➜ Không có lệnh "${args.join(' ')}"\n➜ Lệnh gần giống là "${cmd.config.name}" ?`, tid, mid);*/
            };
        };
    } else {
        const data = commandsGroup();
        var txt = '====[ M E N U ]====\n',
        count = 0;
        for (const {
            commandCategory,
            commandsName
        } of data) txt += `─────────\n ${++count}✍️ ${commandCategory} \n->hiện Có [ ${commandsName.length} ] lệnh\n`;
        txt += `──────────────────
[🎮] Hiện tại có:  ${global.client.commands.size} lệnh
[👉] Phản hồi từ 1 đến ${data.length} để chọn
[🍄] dùng [ ${pr} ] menu all để xem toàn bộ các lệnh có trên hệ thống 😻
[⏰] Time dùng: ${l}
[🔰] Người dùng lệnh: ${n}
[🌐] Link profile: https://www.facebook.com/profile.php?id=${uid}`;
        const msg = sendAttachments.status ? {
            body: txt
            ,attachment: await images()
              }: txt;
        send(msg, tid, (a, b) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: b.messageID,
                author: sid,
                'case': 'infoGr',
                data
            });
            if (autoUnsend.status) setTimeout(v1 => un(v1), 1000*autoUnsend.timeOut, b.messageID);
        });
    };
};
module.exports.handleReply = async function({
    handleReply: $,
    api,
    event, Users
}) {
    const {
        sendMessage: send,
        unsendMessage: un
    } = api;
    const {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        args
    } = event;
const moment = require("moment-timezone");
    var l = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  let thR = global.data.threadData.get(tid) || {};
let pr = thR.PREFIX || global.config.PREFIX;
let n = await Users.getNameUser(sid)
let uid = event.senderID;
    if (sid != $.author) {
        const msg = sendAttachments.status ? {
            body: `====[ MENU BOT ]====\n\n[⚠️] Bạn không phải là người dùng\n[⚠️] Người dùng mới được dùng`
            //attachment: await images()
        }: `====[ MENU BOT ]====\n\n[⚠️] Bạn không phải là người dùng \n[⚠️] Người dùng mới được dùng`;
        return send(msg, tid, mid);
    };
    switch ($.case) {
        case 'infoGr': {
            var data = $.data[(+args[0])-1];
            if (data == undefined) {
                const txt = `====[ MENU BOT ]====\n[🐦] Lệnh ${args[0]} bạn vừa dùng không có mặt trong hệ thống menu bot`;
                const msg = sendAttachments.status ? {
                    body: txt
                   // ,attachment: await images()
}: txt;
                return send(msg, tid, mid);
            };
            un($.messageID);
            var txt = `====[ ${data.commandCategory} ]====\n`,
            count = 0;
            for (const name of data.commandsName) txt += `[${++count}] ${name}\n`;
            txt += `──────────────────
[🎮] Hiện tại có:  ${global.client.commands.size} 𝗹𝗲̣̂𝗻𝗵
[👉] Phản hồi từ 1 đến ${++count} để chọn
[🍄] dùng [ ${pr} ] menu all để xem tất cả lệnh có trên hệ thống 
[⏰] Time dùng: ${l}
[🔰] Người dùng lệnh: ${n}
[🌐] Link profile: https://www.facebook.com/profile.php?id=${uid}`;
            const msg = sendAttachments.status ? {
                body: txt
               // ,attachment: await images()
            }: txt;
            send(msg, tid, (a, b) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: b.messageID,
                    author: sid,
                    'case': 'infoCmds',
                    data: data.commandsName
                });
                if (autoUnsend.status) setTimeout(v1 => un(v1), 1000*autoUnsend.timeOut, b.messageID);
            });
        };
            break;
        case 'infoCmds': {
            var data = global.client.commands.get($.data[(+args[0])-1]);
            if (typeof data != 'object') {
                const txt = `====[ MENU BOT ]====\nLệnh ${args[0]} bạn vừa dùng hiện không có mặt trong hệ thống menu bot `;
                const msg = sendAttachments.status ? {
                    body: txt
                   // ,attachment: await images()
                      }: txt;
                return send(msg, tid, mid);
            };; const {
                config = {}
            } = data || {};
            un($.messageID);
            const msg = sendAttachments.status ? {
                body: infoCmds(config)
               // ,attachment: await images()
                  }: infoCmds(config);
            send(msg,
                tid,
                mid);
        };
            break;
        default:
            // code
        }
    };
    function commandsGroup() {
        const array = [],
        cmds = global.client.commands.values();
        for (const cmd of cmds) {
            const {
                name,
                commandCategory
            } = cmd.config;
            const find = array.find(i => i.commandCategory == commandCategory)
            !find ? array.push({
                commandCategory,
                commandsName: [name]
            }): find.commandsName.push(name);
        };
        array.sort(sortCompare('commandsName'));
        return array;
    };
  async function images() {
        const data = JSON.parse(readFileSync(__dirname + '/bot/imagesMenu.json'));
       const url = sendAttachments.random ? (data.length == 0 ? sendAttachments.url: data[Math.floor(Math.random()*data.length)]): sendAttachments.url;
        return (await require('axios')({
            url,
            method: 'GET',
            responseType: 'stream',
        })).data;
    };
    function infoCmds(a) {
        return `====[ L Ệ N H (${a.name}) ]==== 

[📠] Phiên bản: ${a.version}
[👑] Quyền hạn: ${premssionTxt(a.hasPermssion)}
[👥] Tác giả: ${a.credits}
[💌] Mô tả: ${a.commandCategory}
[💮] Thuộc nhóm: ${a.description}
[💓] Cách dùng: ${a.usages}
[⏰] Thời gian chờ: ${a.cooldowns}  𝗴𝗶𝗮̂𝘆`;
    };
    function premssionTxt(a) {
        return a == 0 ? 'Thành Viên': a == 1 ? 'Quản Trị Viên Nhóm': a == 2 ? 'Người Điều Hành Bot': 'ADMINBOT';
    };
    function prefix(a) {
        const tidData = global.data.threadData.get(a) || {};
        return tidData.PREFIX || global.config.PREFIX;
    };
    function sortCompare(k) {
        return function(a, b) {
            return (a[k].length > b[k].length ? 1: a[k].length < b[k].length ? -1: 0)*-1;
        };
    };
 