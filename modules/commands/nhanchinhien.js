module.exports.config = {

        name: "nhanchinhien",

        version: "1.0.0",

        hasPermssion: 0,

        credits: "tq.info",//Ai viết mdl quên mẹ rồi nên t thay thành tên t !! Tất cả video dược up bởi tq.info

        description: "RanDom Video Gái",

        commandCategory: "No PreFix",

        usages: "Gái",

        cooldowns: 0,

        denpendencies: {

                "fs-extra": "",

                "request": ""

                

  }

};

module.exports.handleEvent = async ({ api, event, Threads }) => {

  if (event.body.indexOf("nhanchinhien")==0 ||

event.body.indexOf("girl")==0 )

//Thay (tên gọi)theo sở thích

//[ Lưu ý !! Không được để trống ( Tên gọi )

//Hoặc có thể xoá bớt [event.body.indexOf(")==0 ]

{

    const axios = global.nodemodule["axios"];

const request = global.nodemodule["request"];

const fs = global.nodemodule["fs-extra"];

    var link = [ 
"https://i.imgur.com/dUJJe9H.jpeg",
"https://i.imgur.com/h1Cu5w2.jpeg",
"https://i.imgur.com/wlXJtBH.jpeg",
"https://i.imgur.com/ACmpDuM.jpeg",
"https://i.imgur.com/E3Y1eeq.jpeg",
"https://i.imgur.com/C0VCtNo.jpeg",
"https://i.imgur.com/u8kNnrz.jpeg",
"https://i.imgur.com/Z9OKKyZ.jpeg",
"https://i.imgur.com/5yWWzgw.jpeg",
"https://i.imgur.com/YuWDlPb.jpeg",
"https://i.imgur.com/GRlqKF7.jpeg",
"https://i.imgur.com/1K7ZPzi.jpeg",
"https://i.imgur.com/R7Xd9T0.jpeg",
"https://i.imgur.com/NrewcZn.jpeg",
"https://i.imgur.com/gzBMLYj.jpeg",
"https://i.imgur.com/ZJIkTyK.jpeg",
"https://i.imgur.com/asxAusX.jpeg",
"https://i.imgur.com/phexmHT.jpeg",
"https://i.imgur.com/zzukd6F.jpeg",
"https://i.imgur.com/KSoRvfX.jpeg",
"https://i.imgur.com/VTGVoBh.jpeg",
"https://i.imgur.com/pV4Zu0x.jpeg",
"https://i.imgur.com/pl2EeLA.jpeg",
"https://i.imgur.com/Uf4rMGv.jpeg",
"https://i.imgur.com/uqDd9zC.jpeg",
"https://i.imgur.com/zZtVsFn.jpeg",
"https://i.imgur.com/1vOwkDy.jpeg",
"https://i.imgur.com/k4OrrAU.mp4",
"https://i.imgur.com/MV5uTOp.mp4",
"https://i.imgur.com/53MNrj0.mp4",
"https://i.imgur.com/vKBGp7V.mp4",
"https://i.imgur.com/mMNc5b8.mp4",
"https://i.imgur.com/siAALXL.mp4",
         ];

     var callback = () => api.sendMessage({body:``,attachment:fs.createReadStream(__dirname + "/cache/2.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/2.mp4"), event.messageID);  

      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/2.mp4")).on("close",() => callback());

}

                                                                                                         }

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {


   };
                