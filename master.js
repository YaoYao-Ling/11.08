const http = require('http');
const child_process = require('child_process');

const server = http.createServer((req, res) => {

})
server.listen(9090);
const cpulen = require('os').cpus().length;

let workers = {}

function createProcess() {
    let worker = child_process.fork('./worker.js')
    worker.send('server', server);
    workers[worker.pid] = worker;
    worker.on('message', info => {
        console.log('error', info.pid);
        delete workers[worker.pid];
        worker.kill();
        createProcess()

    })
    worker.on('exit', () => {
        delete workers[worker.pid]
        createProcess()
    })
}
for (let i = 0; i < cpulen; i++) {
    createProcess()
}