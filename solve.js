const { rand } = require('./function');
const { Mode, costFunction } = require('./cda');
const { F, C, H, D, U } = require('./data');

/**
 * 精确解
 */
const getX = (num, F, C) => {
  let arrX = [];
  let n = num;
  while (Math.floor(n / F) > 0) {
    arrX.push(n % F);
    n = Math.floor(n / F);
  }
  arrX.push(n % F);
  if (C - arrX.length > 1) {
    let arrXFirst = rand(1, C - arrX.length, [0, 1]);
    arrX = arrX.concat(arrXFirst);
  } else if (C - arrX.length === 1) {
    arrX = arrX.concat([0]);
  }
  arrX.reverse();
  let x = rand(F, C, [0, 1]);
  for (let j = 0; j < arrX.length; j++) {
    x[arrX[j]][j] = 1;
  }
  return x;
}
const fixX = (x, num, F, C) => {
  let arrX = [];
  let n = num;
  while (Math.floor(n / F) > 0) {
    arrX.push(n % F);
    n = Math.floor(n / F);
  }
  arrX.push(n % F);
  if (C - arrX.length > 1) {
    let arrXFirst = rand(1, C - arrX.length, [0, 1]);
    arrX = arrX.concat(arrXFirst);
  } else if (C - arrX.length === 1) {
    arrX = arrX.concat([0]);
  }
  arrX.reverse();
  for (let j = 0; j < arrX.length; j++) {
    x[arrX[j]][j] = 1;
  }
  return x;
}
const check = (x) => {
  let sum;
  for(let i = 0; i < x.length; i++){
    xi = x[i];
    sum = 0;
    for(let j = 0; j < xi.length; j++){
      sum += xi[j];
    }
    if(sum > U || sum < 0){
      return false;
    }
  }
  return true;
}
// const costFunction = () => {
//   return 1000;
// }
const solve = (start, end, F, C, H, D, U) => {
  let minCost = 999999;
  let minCostX = [];
  let presentX = rand(F, C, [0, 1]);
  for (let i = start; i < end; i++) {
    presentX = fixX(presentX, i, F, C);//getX(i, F, C);
    let is = true;
    // 强容量限制的设施选址问题需要检查解
    if (Mode) {
      is = check(presentX);
    }
    if (is) {
      let presentCost = costFunction(presentX, H, D, U);
      if (presentCost < minCost) {
        minCost = presentCost;
        minCostX = presentX;
        // console.log(minCostX, minCost);
      }
    }
  }
  return minCost;
}
module.exports = {
  getX,
  check,
  solve,
}