const { join } = require("path");
const { existsSync, writeFileSync, readFileSync } = require("fs-extra");

module.exports.config = {
    name: "autosetname",
    version: "1.0.1",
    hasPermssion: 1,
    credits: "D-Jukie",
    description: "Tự động setname cho thành viên mới",
    commandCategory: "nhóm",
    usages: "[add <name> /remove] ",
    cooldowns: 5
}

module.exports.onLoad = () => {
    console.log('=======[ AUTOSETNAME LOADED SUCCESSFULLY ]=======')
    const pathData = join(__dirname, "data", "autosetname.json");
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
}

module.exports.run = async function  ({ event, api, args, permssionm, Users })  {
    const { threadID, messageID } = event;
    const pathData = join(__dirname, "data", "autosetname.json");
    const content = (args.slice(1, args.length)).join(" ");
    var dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
    var thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };
    switch (args[0]) {
        case "add": {
            if (content.length == 0) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Phần cấu trúc tên của thành viên mới không được phép để trống", threadID, messageID);
            if (thisThread.nameUser.length > 0) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Vui lòng sử dụng remove để xóa cấu trúc tên cũ để set tên mới", threadID, messageID); 
            thisThread.nameUser.push(content);
            const name = (await Users.getData(event.senderID)).name
            writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
            api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Tự động set biệt danh của thành viên mới thành công\n[ 𝗠𝗢𝗗𝗘 ] → Tên dự kiến: ${content} ${name}`, threadID, messageID);
            break;
        }
        case "rm":
        case "remove":
        case "delete": {
                if (thisThread.nameUser.length == 0) return api.sendMessage("[ 𝗠𝗢𝗗𝗘 ] → Nhóm của bạn chưa set cấu trúc tên của thành viên mới", threadID, messageID);
                thisThread.nameUser = [];
                api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Xóa thành công cấu trúc của thành viên`, threadID, messageID);
                break;
        }
        default: {
                return api.sendMessage(`[ 𝗠𝗢𝗗𝗘 ] → Dòng: /autosetname add <name> nếu muốn tự động đặt biệt danh cho thành viên mới\n\n[ 𝗠𝗢𝗗𝗘 ] → Dòng: /autosetname remove nếu muốn xóa tự động đặt biệt danh cho thành viên mới`, threadID, messageID);
        }
    }
    if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
    return writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}