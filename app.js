const tmi = require("tmi.js");
const request = require('request');
let lang = "kr_ko";//kr_ko, en_us
const local = require(`./local/${lang}.json`);
let cmd = local.cmd.chat
let prefix = local.bot.setting.prefix
const options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
    },
    identity: {
        username: local.bot.setting.username,
        password: local.bot.setting.password
    },
    channels: ["#"+  local.channel]
};

let client = new tmi.client(options);
// Connect the client to the server..
client.connect();

client.on("chat", (channel, user, message, self) => {
    
   // if (self) return;
    let sender = user['display-name'];

    if (message === prefix + cmd.산군) {
        for(i=0; i <15; i++){
            client.action(local.channel, local.chat.sangoon)
        }
    }
    if (message ===  prefix + cmd.clear) {
        if(user['mod'] === true){
        client.clear(local.channel);
        }else{
        client.action(local.channel, local.chat.notclear)
        }
    }
    if (message ===  prefix + cmd.uptime) {
      request("https://decapi.me/twitch/uptime/" + local.channel, function (err, response, body) {
    if (err) {
        console.log(err)
    }
        client.action(local.channel, body)
    });
    }

     
});



/*
 * client.on("join", (channel, username, self) => {
 * client.action(local.channel, username + " ㅎㅇ")
 * });
*/
