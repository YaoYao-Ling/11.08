const http = require('http');
const childProcess = require('child_process');
const server = http.createServer((req, res) => {
    if (req.url === '/count') {
        let child_process = childProcess.fork('./count.js');
        child_process.on('message', (timer) => {
            res.end(timer)
        })
    }
    child_process.send('主进程数据')
})
server.listen(9090)