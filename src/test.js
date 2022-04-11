const { dataFunction } = require('./data');
const { cda } = require('./cda');

const allTimes = 50;
let betterTimes = 0;
for (let i = 0; i < allTimes; i++) {
  const { Mode, F, C, H, D, U, MaxLoopTimes, MaxExchangeTimes } = dataFunction();
  const [cost, expectCost] = cda(Mode, F, C, H, D, U, MaxLoopTimes, MaxExchangeTimes);
  const better = cost > expectCost;
  console.log(cost, expectCost);
   if (better) {
    betterTimes++;
  }
}
console.log('混合策略更好的比例', betterTimes/allTimes);