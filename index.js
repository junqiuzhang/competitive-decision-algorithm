const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { Mode, F, C, H, D, U, MaxLoopTimes, MaxExchangeTimes } = require('./data');
const { cda } = require('./cda');
const { solve } = require('./solve');

if (cluster.isMaster) {
  let endTaskNum = 0

  console.time('main')

  cda(Mode, F, C, H, D, U);
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.send(i);
  }

  cluster.on('message', (worker, message) => {
    console.log(`[Master]# Worker ${worker.id}: ${message}`)
    endTaskNum++
    if (endTaskNum === numCPUs) {
      console.timeEnd('main')
      cluster.disconnect()
    }
  })
  
  cluster.on('exit', (worker, code, signal) => console.log(`[Master]# Worker ${worker.id} died.`))
} else {
  process.on('message', seq => {
    const start = Date.now()
    const MaxLoopNumber = Math.pow(F, C);
    const startNum = Math.floor(MaxLoopNumber / numCPUs) * seq;
    const endNum = Math.floor(MaxLoopNumber / numCPUs) * (seq + 1) + 1;
    const result = solve(startNum, endNum, F, C, H, D, U)

    console.log(`[Worker]# The result of task ${process.pid} is ${result}, taking ${Date.now() - start} ms.`)
    process.send('My task has ended.')
  })
}