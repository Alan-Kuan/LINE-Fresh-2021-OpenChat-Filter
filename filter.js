/*
 * Filter the message history and output a clean history.
 * It is executed beforehand.
 */
const fs = require('fs');
const readline = require('readline');

const line_reader = readline.createInterface({
    input: fs.createReadStream('./[LINE] LINE FRESH的聊天記錄.txt')
});

var history = {};
var current_date = null;

const date_pattern = /^\d\d\d\d\/\d\d?\/\d\d?（.+）$/;
const new_msg_pattern = /^(\d\d:\d\d)\t(.+?)\t(.+)$/;

line_reader.on('line', function (line) {
    if(line.length === 0) return;
    if(line.includes('Auto-reply')) return;
    if(line.includes('加入聊天')) return;
    if(line.includes('退出社群')) return;
    if(line.includes('請參考置頂公告改暱稱喔')) return;
    if(line.includes('依照「學校-系級-姓名」做暱稱變更')) return;
    if(line.includes('[貼圖]')) return;
    if(line.includes('[照片]')) return;
    if(line.includes('已將聊天室的人數上限設為')) return;
    if(line.includes('變更了聊天室圖片')) return;
    if(line.includes('Spam Filter')) return;
    if(/已將「.+」加入/.test(line)) return;

    // new date
    if(date_pattern.test(line)) {
        current_date = line;
        history[current_date] = [];
    // first 2 lines
    } else if(current_date === null) {
        console.log(line);
    // new message
    } else if(new_msg_pattern.test(line)) {
        const msg = parseMessage(line);
        history[current_date].push(msg);
    // next line of previous message
    } else {
        let len = history[current_date].length;
        history[current_date][len - 1].content.push(line.wrapURLs(true));
    }

    fs.writeFileSync('./filtered_messages.json', JSON.stringify(history));
});

function parseMessage(line) {
    let regex = line.match(new_msg_pattern);
    return {
        time: regex[1],
        author: regex[2],
        content: [ regex[3].wrapURLs(true) ]
    };
}

// Source: https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
String.prototype.wrapURLs = function (new_window) {
    var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
    var target = (new_window === true || new_window == null) ? '_blank' : '';

    return this.replace(url_pattern, function (url) {
        var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
        var href = protocol_pattern.test(url) ? url : 'http://' + url;
        return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
    });
};
