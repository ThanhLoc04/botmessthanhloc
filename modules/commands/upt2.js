module.exports.config = {
	name: "upt2",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Nam",
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "Hệ Thống",
	cooldowns: 0
}
module.exports.languages = {
  "vi": {
    "uptime": "%1:%2:%3"
  },
  "en": {
    "uptime": "%1:%2:%3"
  }
}
module.exports.run = async({ api, event, getText }) => {
var startTime = Date.now()
var uptime = process.uptime()
		hours = Math.floor(uptime / (60 * 60))
		miutes = Math.floor((uptime % (60 * 60)) / 60)
		seconds = Math.floor(uptime % 60)

 api.sendMessage(getText("uptime", checkTime(hours), checkTime(miutes), checkTime(seconds), (Date.now()-startTime)), event.threadID, event.messageID)
}
function checkTime(i) {
  if (i < 10) {
      i = "0" + i
    }
  return i
}