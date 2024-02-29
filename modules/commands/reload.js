module.exports.config = {
	name: "reload",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Chill with Tea",
	description: "Khởi động lại Bot",
	commandCategory: "Thanh Loc",
	usages: "reload + time",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
 const permission = ["100063600331393"];
             if (!permission.includes(event.senderID))
             return api.sendMessage("《Muốn reload sao ừ bạn không đủ tuổi》", event.threadID, event.messageID);
	const { threadID, messageID } = event;
	var time = args.join(" ");
	var rstime = "10";
	if (!time) rstime = "11";
	else rstime = time;
	api.sendMessage(`[Bot] => Sẽ reload lại bot sau ${rstime} giây nữa !`, threadID);
	return setTimeout(() => { api.sendMessage("[Bot] => Đang Reload Bot !",event.threadID,() => process.exit(1) )},	rstime * 1000);
}