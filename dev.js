/*
 * A simple local development web server.
 */
const http = require('http');
const fs = require('fs').promises;

http.createServer(function (req, res) {
    if(req.url === '/') {
        fs.readFile(__dirname + '/index.html')
            .then(content => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(content);
            })
            .catch(err => {
                res.writeHead(404);
                res.end(err);
            });
    } else if(req.url === '/filtered_messages.json') {
        fs.readFile(__dirname + '/filtered_messages.json')
            .then(content => {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(content);
            })
            .catch(err => {
                res.writeHead(404);
                res.end(err);
            });
    } else if(req.url === '/display.js') {
        fs.readFile(__dirname + '/display.js')
            .then(content => {
                res.writeHead(200);
                res.end(content);
            })
            .catch(err => {
                res.writeHead(404);
                res.end(err);
            });
    } else if(req.url === '/style.css') {
        fs.readFile(__dirname + '/style.css')
            .then(content => {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.end(content);
            })
            .catch(err => {
                res.writeHead(404);
                res.end(err);
            });
    } else {
        res.writeHead(404);
        res.end();
    }
}).listen(3000);
