/*module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "NTKhang update & fix by DuyVuong and D-jukie",
  description: "Thông báo lỗi của bot đến admin hoặc góp ý",
  commandCategory: "Hệ thống quản trị viên",
  usages: "[lỗi gặp phải hoặc ý kiến]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
  try {
    var name = (await Users.getData(event.senderID)).name;
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.attachments.length != 0) {
      for (var p of event.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    };
    switch (handleReply.type) {
      case "reply": {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({
              body: "[📄]→ Phản hồi từ " + name + ":\n" + (event.body) || "không có nội dung trả lời", mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            }));
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: "[📄]→ Phản hồi từ " + name + ":\n" + (event.body) || "chỉ có tệp không có nội dung trả lời" + "\n----------------\n[⚜️]→ Kèm theo tệp!", attachment: l, mentions: [{
                id: event.senderID,
                tag: name
              }]
            }, ad, (e, data) => global.client.handleReply.push({
              name: this.config.name,
              messageID: data.messageID,
              messID: event.messageID,
              author: event.senderID,
              id: event.threadID,
              type: "calladmin"
            }));
            for (var b of s) {
              fs.unlinkSync(b);
            }
          }
        }
        break;
      }
      case "calladmin": {
        if (s.length == 0) {
          api.sendMessage({ body: `[⚜️]→ Phản hồi từ admin ${name} đến bạn:\n--------\n${(event.body) || "không có nội dung trả lời"}\n--------\n[💬]→ Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin`, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
        }
        else {
          api.sendMessage({ body: `[⚜️]→ Phản hồi từ admin ${name} đến bạn:\n--------\n${(event.body) || "chỉ có tệp không có nội dung trả lời"}\n--------\n[💬]→ Phản hồi tin nhắn này để tiếp tục gửi báo cáo về admin\n--------\n[⚜️]→ Tệp admin gửi đến bạn!`, attachment: l, mentions: [{ tag: name, id: event.senderID }] }, handleReply.id, (e, data) => global.client.handleReply.push({
            name: this.config.name,
            author: event.senderID,
            messageID: data.messageID,
            type: "reply"
          }), handleReply.messID);
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
        break;
      }
    }
  }
  catch (ex) {
    console.log(ex);
  }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
  try {
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;
    if (event.messageReply) {
    if (event.messageReply.attachments.length != 0) {
      for (var p of event.messageReply.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if (p.type == 'photo') {
          var e = 'jpg';
        }
        if (p.type == 'video') {
          var e = 'mp4';
        }
        if (p.type == 'audio') {
          var e = 'mp3';
        }
        if (p.type == 'animated_image') {
          var e = 'gif';
        }
        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    }
  }
    if (!args[0] && event.messageReply.attachments.length == 0)
      return api.sendMessage(
        "[⚜️]→ Bạn chưa nhập nội dung cần báo cáo",
        event.threadID,
        event.messageID
      );

    var name = (await Users.getData(event.senderID)).name;
    var idbox = event.threadID;

    var datathread = (await Threads.getData(event.threadID)).threadInfo;
    var namethread = datathread.threadName;

    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss D/MM/YYYY");
    var soad = global.config.ADMINBOT.length;
    api.sendMessage(
      "=== 『 Success 』 ===\n[⚜️]→  Đã gửi nội dung tới " + soad + " admin bot...",
      event.threadID,
      () => {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({ body: `[⚜️]→  Báo cáo từ: ${name}\n[⚜️]→ 
 Box: ${namethread}\n[⚜️]→ ID box: ${idbox}\n----------------\n[⚠️]→ Lỗi: ${args.join(
              " "
            )}\n----------------\n[⚜️]→ Time: ${gio}`, mentions: [{ id: event.senderID, tag: name }] },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
        }
        else {
          for (let ad of idad) {
            api.sendMessage({
              body: `[⚜️]→ Báo cáo từ: ${name}\n⚡Box: ${namethread}\n[⚜️]→ ID box: ${idbox}\n----------------\n[⚠️]→ Lỗi: ${(args.join(
                " "
              )) || "chỉ có tệp không có nội dung báo cáo!"}\n----------------\n[⚜️]→ Time: ${gio}\n----------------\n[⚜️]→ Kèm theo tệp!`, attachment: l, mentions: [{ id: event.senderID, tag: name }]
            },
              ad, (error, info) =>
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                messID: event.messageID,
                id: idbox,
                type: "calladmin"
              })
            );
          }
          for (var b of s) {
            fs.unlinkSync(b);
          }
        }
      }
      , event.messageID);
  }
  catch (ex) {
    console.log(ex);
  }
};*/
let link_avatar_fb = id=>`https://graph.facebook.com/${id}/picture?height=2000&width=2000&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
let streamURL = (url, type)=>require('axios').get(url, {
    responseType: 'arraybuffer'
}).then(res=> {
    let path = __dirname+'/cache/'+Date.now()+'.'+type;

    require('fs').writeFileSync(path, res.data);
    setTimeout(p=>require('fs').unlinkSync(p), 1000*60, path);
 
    return require('fs').createReadStream(path);
}).catch(()=>1);

exports.config = {
    name: 'callad',
    version: '111.1.1',
    hasPermssion: 1,
    credits: 'DC-Nam',
    description: 'Liên hệ ADMIN bot',
    commandCategory: 'Người dùng',
    usages: '[]',
    cooldowns: 3
};


exports.handleReply = async function(o) {
    let _ = o.handleReply;
    let {
        threadID: tid,
        messageID: mid,
        senderID: sid,
        args,
        body,
        attachments = []
    } = o.event;
    let send = (msg, callback)=>o.api.sendMessage(msg, tid, callback, mid);
    let form_msg = {};

    //if (sid != _.event.senderID)return;

    if (attachments.length > 0) {
        form_msg.attachment = [];
        for (let attachment of attachments)form_msg.attachment.push(await streamURL(attachment.url, attachment.type == 'video'?'mp4': 'png'));
    };

    switch (_.type) {
        // code chọn admin để call
        case 'user_choose_admin': {
            let admin_all = args[0].toLowerCase() == 'all'?config.ADMINBOT: args.filter($=>isFinite($)).map($=>config.ADMINBOT[$-1]).filter($=>!!$);

            if (admin_all == null)return send(`[⚜️]➜ Lựa chọn không hợp lệ.`);

            send(`[⚜️]➜ Reply tin nhắn này để nhập nội dung.`, (err, res)=> {
                if (err)return console.log(err);

                res.type = 'user_call__reply';
                res.name = exports.config.name;
                res.event = o.event;
                res.admin_all = admin_all;
                res.is_call = true;
                client.handleReply.push(res);
            });
        };
            break;
        // code sẽ chạy khi admin bot reply
        case 'admin_reply': {
            if (!body && !form_msg.attachment)return send(`[⚜️]➜ Chưa nhập nội dung.`);

            form_msg.body = `== ADMIN REPLY ==\n\n[⚜️]➜ Tên: ${data.userName.get(sid)}\n[⚜️]➜ Nội Dung: ${body || 'Không Có Nội Dung.'}`;

            o.api.sendMessage(form_msg, _.event.threadID, (err, res)=> {
                if (err)return console.log(err);

                res.type = 'user_call__reply';
                res.name = exports.config.name;
                res.event = o.event;
                res.admin_all = [sid];
                client.handleReply.push(res);

                send(`[⚜️]➜ Đã phản hồi đến người dùng ${data.userName.get(_.event.senderID)}.`);
            },
                _.event.messageID);
        }; break;
        //code sẽ chạy khi user reply
        case 'user_call__reply': {
            if (!body && !form_msg.attachment)return send(`[⚜️]➜ Chưa nhập nội dung.`);

            let count_success = 0;

            form_msg.body = `== USER ${_.is_call?'CALL': 'REPLY'} ==\n\n[⚜️]➜ Tên: ${data.userName.get(sid)}${!!tid && tid != sid ? '\n[⚜️]➜ Nhóm: '+data.threadInfo.get(tid).threadName: ''}\n[⚜️]➜ Nội Dung: ${body || 'Không Có Nội Dung.'}`;

            for (let admin_id of _.admin_all)try {
                await new Promise((resolve, reject)=> {

                    o.api.sendMessage(form_msg, admin_id, (err, res)=> {
                        if (err)return reject(err);

                        res.type = 'admin_reply';
                        res.name = exports.config.name;
                        res.event = o.event;
                        res.admin_all = _.admin_all;
                        client.handleReply.push(res);
                        resolve(res);
                    },
                        _.is_call?undefined: _.event.messageID);

                });

                ++count_success;
            } catch (e) {
                console.log(e);
            };
            let send_result_text = _.is_call
            ?`[⚜️]➜ Đã liên hệ đến ${count_success} admin bot vui lòng đợi phản hồi.`: `[⚜️]➜ Đã phản hồi đến Quản trị viên bot ${data.userName.get(_.admin_all[0])}.`;

            send(send_result_text);
        };
            break;

        default: {};
            break;
    };

};
exports.run = async function(o) {
    let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    let attachment = [];

    for (let admin_id of config.ADMINBOT)try {
        attachment.push(await streamURL(link_avatar_fb(admin_id), 'jpg'));
    } catch (e) {};

    send({
        body: (config.ADMINBOT || ['0']).map(($, i)=>`${i+1}. ${data.userName.get($)} (Facebook.com/${$})\n${'₋'.repeat(20)}`).join('\n')+`\n[⚜️]➜ Reply {STT} (cách nhau để chọn nhiều)`,
        attachment,
    },
        (err, res)=>(
            res.type = 'user_choose_admin',
            res.name = exports.config.name,
            res.event = o.event,
            client.handleReply.push(res)
        ));
};