exports.config = {
  name: 'note',
  version: '0.0.1',
  hasPermssion: 2,
  credits: 'DC-Nam',
  description: 'Tạo link chứa nội dung file',
  commandCategory: 'Tiện ích',
  usages: '[path]',
  cooldowns: 3
};
let axios = require('axios');
let fs = require('fs');

let web = 'https://nams.live/note';
exports.run = function(o) {
  let [path, url] = o.args;
  let send = msg => o.api.sendMessage(msg, o.event.threadID, o.event.messageID);

  if (!/^http(s|):\/\//.test(url)) {
    if (!fs.existsSync(path))return send(`file không tồn tại.`);
    axios.post(web+'.edit', {
      text: fs.readFileSync(path, 'utf8'),
    }).then(res=>send(`Raw: ${web}.raw/${res.data}\nEdit: ${web}.edit/${res.data}`)).catch(err=>send(err.message));
  } else axios.get(url).then(res=> {
      fs.writeFileSync(path, res.data);
      send(`Đã lưu nội dung vào file ${path}`);
    }).catch(err=>send(err.message));
};