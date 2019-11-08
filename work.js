const http = require('http');

const childserver = http.createServer((req, res) => {
    if (req.url === '/list') {
        res.end('list')
    } else if (req.url === 'error') {
        throw 'error'
    } else {
        res.end('ok')
    }
})
process.on('message', (flag, server) => {
    if (flag === 'server') {
        server.on('connection', scoket => {
            childserver.emit('connection', scoket)
        })
    }
})
process.on('uncaughtException', () => {
    process.send({ msg: "error", pid: process.pid })
})