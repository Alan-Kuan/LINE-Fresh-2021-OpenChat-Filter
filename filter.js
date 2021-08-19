/*
 * Filter the message history and output a clean history.
 * It is executed beforehand.
 */
const fs = require('fs');
const readline = require('readline');

const line_reader = readline.createInterface({
    input: fs.createReadStream('./[LINE] Chat in LINE FRESH.txt')
});

var history = {};
var current_date = null;

const date_pattern = /^\w\w\w, \d\d?\/\d\d?\/\d\d\d\d$/;
const new_msg_pattern = /^(\d\d:\d\d)\t(.+?)\t(.+)$/;

line_reader.on('line', function (line) {
    if(line.length === 0) return;
    if(line.includes('Auto-reply')) return;
    if(line.includes('the chat')) return;
    if(line.includes('was banned from the OpenChat')) return;
    if(line.includes('[Sticker]')) return;
    if(line.includes('請參考置頂公告改暱稱喔')) return;

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
        history[current_date][len - 1].content.push(line);
    }

    fs.writeFileSync('./filtered_messages.json', JSON.stringify(history));
});

function parseMessage(line) {
    let regex = line.match(new_msg_pattern);
    return {
        time: regex[1],
        author: regex[2],
        content: [ regex[3] ]
    };
}
