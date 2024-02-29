const fs = require('fs');
const path = require('path');
const axios = require('axios');
const folderPath = __dirname;

module.exports.config = {
  name: "file",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "L.V. Bằng",
  description: "",
  commandCategory: "Admin",
  usages: "",
  cooldowns: 0
};

module.exports.run = async function({ event, api }) {

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Không thể đọc thư mục: ', err);
      return;
    }
    const jsFiles = files.filter(file => path.extname(file).toLowerCase() === '.js');


    let msg = 'Các file hiện có trong folder commands!\n';
    jsFiles.forEach((file, index) => {
      msg += `\n${index + 1}. ${file}`;
    });
    msg += '\n\nReply theo stt + del/raw!'

    api.sendMessage(msg, event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: event.senderID
      });
    }, event.messageID);
  })
};

module.exports.handleReply = async function({ args, event, api, handleReply }) {
  const splitBody = event.body.split(' ');
  const input = splitBody[0];
  const type = splitBody[1];
  console.log(typeof splitBody[1])
  if (!type)
    return api.sendMessage('Vui lòng nhập type (raw/del)!', event.threadID, event.messageID)

  const { author } = handleReply;

  if (event.senderID !== author)
    return api.sendMessage('Cặk', event.threadID, event.messageID);

    fs.readdir(folderPath, async (err, files) => {
      try {
      const jsFiles = files.filter(file => path.extname(file).toLowerCase() === '.js');
      const selectedFileIndex = parseInt(input, 10);
      if (selectedFileIndex >= 1 && selectedFileIndex <= jsFiles.length) {
        const selectedFileName = jsFiles[selectedFileIndex - 1];
        if (type === 'del') {
          fs.unlinkSync(`${__dirname}/${selectedFileName}`)
          api.sendMessage(`Đã xoá file ${selectedFileName}!`)
        }
        if (type == 'raw') {
          const data = fs.readFileSync(`${__dirname}/${selectedFileName}`, 'utf8');
          console.log('ok')
          const result = await axios.post("https://api.mocky.io/api/mock", {
            "status": 200,
            "content": `${data}`,
            "content_type": "application/json",
            "charset": "UTF-8",
            "secret": "lvbang",
            "expiration": "never"
          });
          api.sendMessage(result.data.link, event.threadID, event.messageID);
        }
      } else {
        api.sendMessage('Lựa chọn không hợp lệ.', event.threadID, event.messageID);
      }
    } catch (err) {
    console.log(err)
      }
  }) 
      }