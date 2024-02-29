module.exports.config = {
    name: "locmem",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "",
    commandCategory: "Tiện ích",
    depndencies: {},
    usages: "",
    cooldowns: 5
}, module.exports.handleReply = async function({
    api: e,
    args: n,
    Users: a,
    handleReply: s,
    event: t,
    Threads: r
}) {
    const {
        threadID: o,
        messageID: i
    } = t;
    if (parseInt(t.senderID) === parseInt(s.author) && "reply" === s.type) {
        var d = 1,
            c = "",
            h = t.body.split(" ").map((e => parseInt(e))),
            {
                userInfo: p,
                adminIDs: g
            } = await e.getThreadInfo(t.threadID);
        if (!g.some( (j) =>+j['id'] == +e.getCurrentUserID() )) return e.sendMessage("Cần cấp quyền quản trị viên cho bot thì mới lọc được.", o);
        for (let n of h) {
            var l = s.idLoc[n - 1],
                m = s.idName[n - 1];
            await e.removeUserFromGroup(parseInt(l), o);
            c += d++ + ". " + m + "\n🔰uid: " + l + "\n"
        }
        e.sendMessage(`🍄 Lọc mấy con lợn(true/false) 🍄\n\n${c}`, t.threadID, (() => e.unsendMessage(s.messageID)))
    }
}, module.exports.run = async function({
    api: e,
    event: n,
    args: a,
    Users: s,
    Threads: t,
    Currencies: r
}) {
    const {
        threadID: o,
        messageID: i
    } = n;
    if ("ManhG" != this.config.credits) return e.sendMessage("⚡️Phát hiện credits đã bị thay đổi", n.threadID, n.messageID);
    var d, c = [],
        h = [],
        p = [],
        g = [];
    D = 1, j = 1, d = n.participantIDs;
    for (let e of d) {
        "Người dùng Facebook" == await global.data.userName.get(e) && c.push(`${j++}. ${e}\n`)
    }
    var l = [],
        m = [];
    for (const e of d) l.push({
        id: e,
        name: global.data.userName.get(e) || await s.getNameUser(e)
    });
    for (const e of l) {
        const n = await r.getData(e.id);
        m.push({
            idUser: e.id,
            name: e.name,
            exp: void 0 === n.exp ? 0 : n.exp
        })
    }
    m.sort((function(e, n) {
        return e.exp - n.exp
    }));
    var u = 1;
    (u = parseInt(a[0]) || 1) < -1 && (u = 1);
    for (var I = `=====『 𝗟𝗢̣𝗖 𝗧𝗛𝗔̀𝗡𝗛 𝗩𝗜𝗘̂𝗡 』=====\n\n→ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗻𝗵𝗼́𝗺 𝗰𝗼́ ${c.length} 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝘀𝗲𝗲𝗻 𝗰𝗵𝘂̀𝗮 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺 𝗰𝗮̂̀𝗻 𝗽𝗵𝗮̉𝗶 𝗹𝗼̣𝗰 𝗻𝗴𝗮𝘆\n━━━━━━━━━━━━━━━━\n`, f = Math.ceil(m.length / 20), D = 20 * (u - 1); D < 20 * (u - 1) + 20 && !(D >= m.length); D++) {
        let e = m[D];
        h.push(`[ ${D+1} ] → ${e.name}: ${e.exp} 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻\n`), p.push(`${e.idUser}`), g.push(`${e.name}`)
    }
    return I += `${h.join("")}\n`, c.length > 0 && (I += `𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗨𝘀𝗲𝗿𝗜𝗱:\n${c.join("")}\n`), I += `<𝗦𝗼̂́ 𝘁𝗿𝗮𝗻𝗴 ${u}/${f}>\n💞 𝗗𝘂̀𝗻𝗴 ${global.config.PREFIX}𝗹𝗼𝗰𝗺𝗲𝗺 + 𝘀𝗼̂́ 𝘁𝗿𝗮𝗻𝗴\n`, e.sendMessage(I + "━━━━━━━━━━━━━━━━\n🧸 𝗥𝗲𝗽𝗹𝘆 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣, 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗿𝗲𝗽 𝗻𝗵𝗶𝗲̂̀𝘂 𝘀𝗼̂́, 𝗰𝗮́𝗰𝗵 𝗻𝗵𝗮𝘂 𝗯𝗮̆̀𝗻𝗴 𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵 đ𝗲̂̉ 𝗹𝗼̣𝗰 𝗰𝗼𝗻 𝗰𝗵𝗶𝗺 𝗹𝗼̛̣𝗻 đ𝗼́!\n( 𝗟𝘂̛𝘂 𝘆́ ) 𝗯𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝗰𝗵𝗼 𝗯𝗼𝘁 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺/𝗸𝗲𝘆 𝘁𝗵𝗶̀ 𝗯𝗼𝘁 𝗺𝗼̛́𝗶 𝗸𝗶𝗰𝗸 đ𝘂̛𝗼̛̣𝗰 𝗻𝗵𝗮", n.threadID, ((e, a) => global.client.handleReply.push({
        name: this.config.name,
        author: n.senderID,
        messageID: a.messageID,
        idLoc: p,
        idName: g,
        type: "reply"
    })))
};