const { dataFunction } = require('./data');
const { cda } = require('./cda');

const allTimes = 1000;
let betterTimes = 0;
for (let i = 0; i < allTimes; i++) {
  const { Mode, F, C, H, D, U, MaxLoopTimes, MaxExchangeTimes } = dataFunction();
  const better = cda(F, C, H, D, U, MaxLoopTimes, MaxExchangeTimes);
  if (better) {
    betterTimes++;
  }
}
console.log('混合策略更好的比例', betterTimes/allTimes);