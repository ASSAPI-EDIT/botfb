const fs = require("fs");
const login = require("fb-chat-api");
const sleep = require("system-sleep");

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    var listenEmitter = api.listen((err, event) => {
        if(err) return console.error(err);

        switch (event.type) {
            case "message":
                if(event.body.startsWith("!help")) {
                    api.setMessageReaction("\uD83D\uDC97", event.messageID);
                    api.sendMessage(`┏──𝘾𝙤𝙢𝙢𝙖𝙣𝙙────
➤!help
➤!emoji [Emoji]
➤!setTitle [TitleName]
➤!setName [Name] [Tags]
➤!spamtag [Message] [Amount] [Tags] Limit 10
➤!get-group
➤!ดูดวง`, event.threadID);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("!emoji")) {
                    let emoji = event.body.split(' ');
                    if(emoji[1] === undefined) {
                        api.setMessageReaction('\uD83D\uDE22', event.messageID);
                        api.sendMessage('Please Enter Emoji such as !emoji 🙀', event.threadID);
                    } else {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        api.changeThreadEmoji(emoji[1], event.threadID);
                    }
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("!setTitle")) {
                    let title = event.body.split(' ');
                    if(title[1] === undefined) {
                        api.setMessageReaction('\uD83D\uDE22', event.messageID);
                        api.sendMessage('Please Enter Title such as !setTitle Hee', event.threadID);
                    } else {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        api.setTitle(title[1], event.threadID);
                    }
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("!setName")) {
                    let name = event.body.split(' ');
                    if(name[1] === undefined) {
                        api.setMessageReaction('\uD83D\uDE22', event.messageID);
                        api.sendMessage('Please Enter Name such as !setName ทาสเซ้ก @User', event.threadID);
                    } else if(name[4] === undefined) {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        let revadd = name[2].replace('@','');
                        api.getUserID(revadd + ' ' + name[3], (err, data) => {
                        if(err) return console.error(err);

                        var threadID = data[0].userID;

                        api.changeNickname(name[1], event.threadID, threadID);
                        });
                    } else if(name[3] === undefined){
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        let revadd = name[2].replace('@','');
                        api.getUserID(revadd, (err, data) => {
                        if(err) return console.error(err);
                        
                        var threadID = data[0].userID;
                        api.changeNickname(name[1], event.threadID, threadID);
                        });
                    } else {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        let revadd = name[2].replace('@','');
                        api.getUserID(revadd + ' ' + name[3] + ' ' + name[4], (err, data) => {
                        if(err) return console.error(err);

                        var threadID = data[0].userID;
                        api.changeNickname(name[1], event.threadID, threadID);
                        });
                    }
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("!spamtag")) {
                    let tag = event.body.split(' ');
                    if(tag[1] === undefined) {
                        api.setMessageReaction('\uD83D\uDE22', event.messageID);
                        api.sendMessage('Please Enter Amount and Tags such as !spamtag 10 @User', event.threadID);
                    } else if(tag[1] > 10) {
                        api.setMessageReaction('\uD83D\uDE22', event.messageID);
                        api.sendMessage("Please Enter Amount don't over 10 such as !spamtag 10 @User", event.threadID);
                    } else if(tag[4] === undefined) {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        let revadda = tag[2].replace('@','');
                        api.getUserID(revadda + ' ' + tag[3], (err, data) => {
                        if(err) return console.error(err);

                        var threadID = data[0].userID;
                        api.changeNickname(name[1], event.threadID, threadID);
                        });
                    } else if(tag[3] === undefined) {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        let revaddb = tag[2].replace('@','');
                        api.getUserID(revaddb, (err, data) => {
                        if(err) return console.error(err);

                        var threadID = data[0].userID;
                        api.changeNickname(name[1], event.threadID, threadID);
                        });
                    } else {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        let revaddc = tag[2].replace('@','');
                        api.getUserID(revaddc + ' ' + tag[3] + ' ' + tag[4], (err, data) => {
                        if(err) return console.error(err);

                        var threadID = data[0].userID;
                        api.changeNickname(name[1], event.threadID, threadID);
                        });
                    }
            }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("!get-group")) {
                    if(event.senderID === '100049845411183') {
                        api.setMessageReaction('\uD83D\uDC97', event.messageID);
                        api.getThreadInfo(event.threadID , function (err, userInfo) {
                        let a = userInfo.participantIDs;
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[0]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[1]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[2]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[3]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[4]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[5]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[6]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[7]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[8]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[9]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[10]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[11]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[12]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[13]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[14]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[15]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[16]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[17]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[18]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[19]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[20]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[21]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[22]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[23]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[24]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[25]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[26]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[27]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[28]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[29]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[30]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[31]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[32]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[33]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[34]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[35]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[36]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[37]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[38]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[39]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[41]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[42]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[43]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[44]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[45]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[46]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[47]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[48]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[49]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[50]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[51]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[52]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[53]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[54]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[55]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[56]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[57]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[58]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[59]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[60]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[61]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[62]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[63]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[64]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[65]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[66]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[67]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[68]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[69]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[70]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[71]);
                        sleep(350);
                        api.changeNickname("ทาสเซ้กที่น่ารักของอ้าย😍", event.threadID, a[72]);
                        sleep(350);
                        });
                    } else {
                        api.setMessageReaction('\uD83D\uDE22', event.messageID);
                        api.sendMessage("Sorry, you don't have permission to use this command.", event.threadID);
                    }
            }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
        switch (event.type) {
            case "message":
                if(event.body.startsWith("!ดูดวง")) {
                    api.setMessageReaction("\uD83D\uDC97", event.messageID);
                    var msg = {
                        body: 'นี่แฟนนาย/เธอ',
                        attachments: readFileSync(__dirname + '/test.jpg')
                    }
                    api.sendMessage(msg, event.threadID);
                }
                api.markAsRead(event.threadID, (err) => {
                    if(err) console.log(err);
                });
        }
    });
});
process.on('uncaughtException', function
(err) {
});
process.on('unhandledRejection', function
(err) {
});