const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { F, C } = require('./data');
const { cda } = require('./cda');
const { solve } = require('./solve');

if (cluster.isMaster) {
  let endTaskNum = 0

  console.time('main')
  console.log(`[Master]# Master starts running. pid: ${process.pid}`)

  cda();
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.send(i);
  }

  cluster.on('message', (worker, message) => {
    console.log(`[Master]# Worker ${worker.id}: ${message}`)
    endTaskNum++
    if (endTaskNum === 4) {
      console.timeEnd('main')
      cluster.disconnect()
    }
  })
  
  cluster.on('exit', (worker, code, signal) => console.log(`[Master]# Worker ${worker.id} died.`))
} else {
  process.on('message', seq => {
    console.log(`[Worker]# starts calculating...`)
    const start = Date.now()
    const MaxLoopNumber = Math.pow(F, C);
    const startNum = Math.floor(MaxLoopNumber / numCPUs) * seq;
    const endNum = Math.floor(MaxLoopNumber / numCPUs) * (seq + 1) + 1;
    const result = solve(startNum, endNum)
    console.log(`[Worker]# The result of task ${process.pid} is ${result}, taking ${Date.now() - start} ms.`)
    process.send('My task has ended.')
  })
}