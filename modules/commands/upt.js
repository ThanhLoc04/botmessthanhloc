const os = require('os');
const moment = require('moment-timezone');
const fs = require('fs').promises;

module.exports.config = {
  name: "upt",
  version: "2.0.0",
  hasPermission: 0,
  credits: "Vtuan",
  Rent: 2,
  description: "Hiển thị thông tin hệ thống của bot",
  commandCategory: "Admin-Hệ Thống",
  usages: "",
  cooldowns: 5
};

async function getDependencyCount() {
    const packageJsonString = await fs.readFile('package.json', 'utf8');
    const packageJson = JSON.parse(packageJsonString);
    const depCount = Object.keys(packageJson.dependencies || {}).length;
    return { depCount };
}

function getStatusByPing(ping) {
  if (ping < 0) {
    return 'rất tốt';
  } else if (ping < 99) {
    return 'tốt';
  } else if (ping < 300) {
    return 'bình thường';
  } else {
    return 'xấu';
  }
}

module.exports.run = async ({ api, event, Threads, Users }) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const uptime = process.uptime();
  const { depCount } = await getDependencyCount();
  let name = await Users.getNameUser(event.senderID);
  const botStatus = getStatusByPing(Date.now() - event.timestamp);

  const uptimeHours = Math.floor(uptime / (60 * 60));
  const uptimeMinutes = Math.floor((uptime % (60 * 60)) / 60);
  const uptimeSeconds = Math.floor(uptime % 60);

  const uptimeString = `${uptimeHours.toString().padStart(2, '0')}:${uptimeMinutes.toString().padStart(2, '0')}:${uptimeSeconds.toString().padStart(2, '0')}`;
  const replyMsg = `
『 𝚄𝙿𝚃𝙸𝙼𝙴 𝚁𝙾𝙱𝙾𝚃 』
▱▱▱▱▱▱▱▱▱▱▱▱▱
|‣ Time onl: ${uptimeString}
————————————————
|‣ Tổng số package: ${depCount}
————————————————
|‣ Tình trạng: ${botStatus}
————————————————
|‣ Ping: ${Date.now() - event.timestamp}ms
————————————————
|‣ RAM: ${(usedMemory / 1024 / 1024 / 1024).toFixed(2)}GB/${(totalMemory / 1024 / 1024 / 1024).toFixed(2)}GB
|‣ CPU: ${os.cpus().length} core(s) - ${os.cpus()[0].model.trim()} @ ${os.cpus()[0].speed}MHz
|‣ Hệ điều hành: ${os.type()} ${os.release()} (${os.arch()})
————————————————
• Yêu cầu bởi: ${name}
▱▱▱▱▱▱▱▱▱▱▱▱▱
• ${moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss')} || ${moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')}`.trim();

  api.sendMessage(replyMsg, event.threadID, event.messageID);
}
