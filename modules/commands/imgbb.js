const axios = require("axios");
 
function stringify(Obj, t) {
  let box = [];
  for (let i in Obj) {
    if (Obj.hasOwnProperty(i)) {
      let a = t ? t + "[" + i + "]" : i;
      let n = Obj[i];
      let enc = null !== n && Object.prototype.toString.call(n).indexOf('Object') > -1 ? stringify(n, a) : encodeURIComponent(a) + "=" + encodeURIComponent(n);
      box.push(enc);
    }
  }
  return box.join("&");
}
 
function regAuthToken() {
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, resData) {
      if (err) reject(err);
      resolve(resData);
    }
  });
 
  axios({
    method: 'GET',
    url: 'https://vi.imgbb.com/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
    }
  })
    .then((res => res.data))
    .then((res) => {
      cb(null, /\.obj\.config\.auth_token="(\w+)";/g.exec(res)[1]);
    }) 
    .catch(cb);
 
  return returnPromise;
}
 
module.exports.config = {
  name: "imgbb",
  version: "1.0.0",
  hasPermssion: 0,
  description: "lấy url imgbb trên message",
  credits: "Sam & imgbb.com",
  commandCategory: "Phương tiện",
  usages: "[reply]",
  cooldowns: 5
}
 
function imgbbCreateURL(url) {
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, resData) {
      if (err) reject(err);
      resolve(resData);
    }
  });
 
  regAuthToken()
    .then(function (token) {
      axios({
        method: "POST",
        url: "https://imgbb.com/json",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
        },
        data: stringify({
          source: url,
          type: "url",
          action: "upload",
          timestamp: Date.now(),
          auth_token: token
        })
      })
        .then((res => res.data))
        .then(function (res) {
          var imgbbURL = res.image.image.url;
          cb(null, imgbbURL);
        })
        .catch(cb);
    })
    .catch(cb);
 
  return returnPromise;
}
 
module.exports.run = async function ({ api, event, args }) {
  const { type, messageReply, threadID } = event;
  let msg = "";
 
  try {
    if (type == "message_reply") {
      if (messageReply.attachments.length < 1) msg += "Vui long chi reply anh";
      else for (let Obj of messageReply.attachments) {
        var imgbbURL = (Obj.type == "photo" || Obj.type == "animated_image") ? await imgbbCreateURL(Obj.url) : "[Function: imgbbError]";
        msg += `"${imgbbURL}"\n\n`;
      }
    }
    else msg += "Vui long reply anh";
 
    return api.sendMessage(msg, threadID);
  } catch (e) {
    console.log(e);
    return api.sendMessage(`Da xay ra loi\n${e}`, threadID);
  }
}