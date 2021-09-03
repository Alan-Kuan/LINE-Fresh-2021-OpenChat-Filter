/*
 * A simple local development web server.
 */
const http = require('http');
const fs = require('fs').promises;

const responseWithFile = (res, file_path, header) => {
    fs.readFile(__dirname + file_path)
        .then(content => {
            res.writeHead(200, header);
            res.end(content);
        })
        .catch(err => {
            console.error(err);
            res.writeHead(302, {'Location': '/'});
            res.end();
        });
};

http.createServer(function (req, res) {

    if(req.url === '/') {
        responseWithFile(res, '/index.html', {'Content-Type': 'text/html'});
    } else if(req.url.endsWith('.html')) {
        responseWithFile(res, req.url, {'Content-Type': 'text/html'})
    } else if(req.url.endsWith('.css')) {
        responseWithFile(res, req.url, {'Content-Type': 'text/css'});
    } else if(req.url.endsWith('.js')) {
        responseWithFile(res, req.url, {'Content-Type': 'text/javascript'});
    } else if(req.url.endsWith('.json')) {
        responseWithFile(res, req.url, {'Content-Type': 'application/json'});
    } else {
        res.writeHead(302, {'Location': '/'});
        res.end();
    }

}).listen(3000);
