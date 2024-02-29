const configCmd = {
    name: 'setupinfo',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'Raiden Makoto',
    description: 'Thiết lập thông tin về bạn',
    commandCategory: 'Tiện ích',
    usages: '< ...|setup|del|avatar >',
    cooldowns: 3
},
fse = require('fs-extra'),
axios = require('axios'),
pathS = __dirname+'/noprefix/savedInfo.json',
streamURL = async url => (await axios.get(url, {
    responseType: 'stream'
})).data,
formInfo = {
    info: [['𝗧𝗲̂𝗻'], ['𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵'], ['𝗕𝗶𝗲̣̂𝘁 𝗱𝗮𝗻𝗵'], ['𝗡𝗼̛𝗶 𝗼̛̉'], ['𝗤𝘂𝗲̂ 𝗾𝘂𝗮́𝗻'], ['𝗦𝗼̛̉ 𝘁𝗵𝗶́𝗰𝗵'], ['𝗖𝗵𝗶𝗲̂̀𝘂 𝗰𝗮𝗼'], ['𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵'], ['𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂'], ['𝗧𝗶𝗲̂̉𝘂 𝘀𝘂̛̉']]};

function swapInArray(a, x, y) {
    b = a[x]
    a[x] = a[y]
    a[y] = b;
    return a;
};

function upperFirstLetter(content) {
    return content.split(' ').map(el=> {
        el = el.split('')
        el[0] = el[0].toUpperCase()
        return el.join('');
    }).join(' ')
};

function loadCmd() {
    if (!fse.existsSync(pathS)) fse.writeFileSync(pathS, '{"user":{}}');
};

async function runCmd(arg) {
    const {
        senderID: sid,
        threadID: tid,
        type,
        messageReply,
        mentions
    } = arg.event,
    id = type == 'message_reply'?messageReply.senderID: (tags = Object.keys(mentions), tags != 0)?tags[0]: sid,
    prefix = arg.event.args[0][0],
    out = (a, b, c, d) => arg.api.sendMessage(a, b?b: tid, c?c: null, d?d: arg.event.messageID),
    dataInfo = JSON.parse(fse.readFileSync(pathS))

    if (/^setup/.test(arg.args[0])) {
        if (!dataInfo.user[sid]) {
            dataInfo.user[sid] = formInfo;
            fse.writeFileSync(pathS, JSON.stringify(dataInfo, 0, 4))
        }
        return out(`🌸=== [ 𝗦𝗘𝗧𝗨𝗣 𝗜𝗡𝗙𝗢 ] ===🌸\n━━━━━━━━━━━━━\n${dataInfo.user[sid].info.map((el, idx)=>`${idx+1}. ${el[0]}: ${!!el[1]?el.pop(): 'Chưa có dữ liệu'}`).join('\n')}\n━━━━━━━━━━━━━\n${upperFirstLetter('• 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 + [ 𝗦𝗧𝗧 ]\n( 𝗫𝗼𝗮́ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 )\n• 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 + [ 𝗦𝗧𝗧 ] + [ 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴 ]\n( 𝗧𝗵𝗲̂𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 )\n• 𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶 + [ 𝗦𝗧𝗧 ] -> [ 𝗦𝗧𝗧 ]\n( 𝗖𝗵𝘂𝘆𝗲̂̉𝗻 𝘃𝗶̣ 𝘁𝗿𝗶́ )\n• 𝗦𝘂̛̉ 𝗱𝘂̣𝗻𝗴 /𝗶𝗻𝗳𝗼 𝗮𝘃𝘁 + [ 𝗟𝗜𝗡𝗞 ]\n( 𝗟𝗮̀𝗺 𝗮𝘃𝗮𝘁𝗮𝗿 )\n• 𝗦𝘂̛̉ 𝗱𝘂̣𝗻𝗴 /𝗶𝗻𝗳𝗼 𝗱𝗲𝗹 𝗵𝗼𝗮̣̆𝗰 /𝗶𝗻𝗳𝗼 𝗿𝗲𝘀𝗲𝘁 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗹𝗮̀𝗺 𝗺𝗼̛́𝗶 𝘁𝗼𝗮̀𝗻 𝗯𝗼̣̂ 𝗶𝗻𝗳𝗼')}`, '', (err, dataMsg) => global.client.handleReply.push({
            name: configCmd.name, messageID: dataMsg.messageID, author: sid, chooses: 'setup'
        }));
    };

    if (!dataInfo.user[id]) return out(sid != id?'[ 𝐈𝐍𝐅𝐎 ] • 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗻𝗮̀𝘆 𝗰𝗵𝘂̛𝗮 𝗰𝗼́ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝘁𝗿𝗼𝗻𝗴 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴': `[ 𝐈𝐍𝐅𝐎 ] • 𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗰𝗼́ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻, 𝗱𝘂̀𝗻𝗴 "${prefix}${configCmd.name} setup" 𝘃𝗮̀ 𝘁𝗵𝗲̂𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝘂̉𝗮 𝗺𝗶̀𝗻𝗵 𝗻𝗵𝗲́`);

    if (/^(avatar|avt)/.test(arg.args[0])) {
        if (!/^https:\/\/[a-zA-Z0-9\.\/\-\_\#]+\.(png|jpg|jpge|JPGE|gif)$/.test(arg.args[1])) return out(`[ 𝐈𝐍𝐅𝐎 ] • 𝗖𝗵𝗶̉ 𝗻𝗵𝗮̣̂𝗻 𝗹𝗶𝗻𝗸 𝗮̉𝗻𝗵 (𝗷𝗽𝗴, 𝗷𝗽𝗴𝗲, 𝗽𝗻𝗴, 𝗴𝗶𝗳)`);
        dataInfo.user[sid].avatar = arg.args[1];
        fse.writeFileSync(pathS, JSON.stringify(dataInfo, 0, 4));
        return out(`[ 𝐈𝐍𝐅𝐎 ] • 𝗧𝗵𝗲̂𝗺 𝗮𝘃𝗮𝘁𝗮𝗿 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴`);
    };

    if (/^(del|reset)/.test(arg.args[0])) {
        delete dataInfo.user[sid];
        fse.writeFileSync(pathS, JSON.stringify(dataInfo, 0, 4));
        return out(`[ 𝐈𝐍𝐅𝐎 ] • 𝗫𝗼𝗮́ 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝘁𝗼𝗮̀𝗻 𝗯𝗼̣̂ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻`);
    };

    const msg = {};

    if ((avt = dataInfo.user[sid].avatar), !!avt) msg.attachment = await streamURL(avt);
    msg.body = "=== [ 𝗜𝗡𝗙𝗢 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ===\n━━━━━━━━━━━━━━\n\n" + dataInfo.user[id].info.map(el => `• ${upperFirstLetter(el[0])}: ${!!el[1]?el.pop(): 'Chưa có dữ liệu'}`).join('\n');
    out(msg);
};

function reply(arg) {
    const {
        senderID: sid,
        threadID: tid,
        body
    } = arg.event,
    _ = arg.handleReply,
    prefix = arg.event.args[0][0],
    out = (a, b, c, d) => arg.api.sendMessage(a, b?b: tid, c?c: null, d?d: arg.event.messageID),
    dataInfo = JSON.parse(fse.readFileSync(pathS))

    if (sid != _.author)return;
    if (/^setup/.test(_.chooses)) {
        var txt = '',
        input = /\n/.test(body)? body.split('\n'): [body];
        for (const el of input) {
            if (/[0-9] \-> [0-9]/.test(el)) {
                const a = el.split(' -> '),
                x = a[0],
                y = a[1]
                swapInArray(dataInfo.user[sid].info, x-1, y-1);
                txt += `- Di chuyển vị trí "${x}" qua "${y}"`;
            } else if (isNaN(el)) {
                const edit = el.split(' '),
                index = edit.shift()-1;

                if (/:$/.test(edit[0])) {
                    if (!dataInfo.user[sid].info[index]) dataInfo.user[sid].info[index] = [];
                    const newI = edit[0].replace(':', '');
                    dataInfo.user[sid].info[index][0] = newI;
                    txt += `\n- Cập nhật ngoại hình "${newI}"`
                    edit.shift();
                }
                const content = edit.join(' ')
                dataInfo.user[sid].info[index].push(content);
                txt += `\n- Cập nhật thông tin`
            } else if (isFinite(el)) {
                const del = dataInfo.user[sid].info.splice(el-1, 1);
                txt += `\n- Gỡ thông tin "${del[0]}: ${del.pop()}"`
            }
        };
        dataInfo.user[sid].info = dataInfo.user[sid].info.filter(el=>!!el);
        fse.writeFileSync(pathS, JSON.stringify(dataInfo, 0, 4))
        out(txt)
    };
};

module.exports = {
    config: configCmd,
    onLoad: loadCmd,
    run: runCmd,
    handleReply: reply
}