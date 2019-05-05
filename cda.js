const Data = require('./data');
const { rand, copyMatrix, bigger, smaller, column, sumArr } = require('./function');
/**
 * Mode: true--强容量限制， false--软容量限制
 */
const Mode = false;

// 竞争力函数
const compete = (i, j, x, y, H, D) => {
  if (sumArr(x[i]) > 0) {
    return 1 / D[i][j];
  }
  return 1 / (H[i] + D[i][j]);
}
// 竞争力函数
const competeSoft = (i, j, x, y, H, D, U) => {
  if (sumArr(x[i]) % U > 0) {
    return 1 / D[i][j];
  }
  return 1 / (H[i] + D[i][j]);
}
// 目标函数
const costFunction = (x, H, D, U) => {
  let sum, min = 0;
  for (let i = 0; i < x.length; i++) {
    xi = x[i];
    sum = 0;
    for (let j = 0; j < xi.length; j++) {
      sum += xi[j];
      if (xi[j]) {
        min += D[i][j];
      }
    }
    min = min + H[i] * Math.ceil(sum / U);
  }
  return min;
}
// 期望目标函数
const expectCostFunction = (x, H, D, U) => {
  let sum, min = 0;
  let minX = copyMatrix(x);
  for (let i = 0; i < x.length; i++) {
    xi = x[i];
    sum = 0;
    for (let j = 0; j < xi.length; j++) {
      sum += xi[j];
      let sumK = 0;
      for (let indexI = 0; indexI < x.length; indexI++) {
        if (sumArr(x[indexI]) > 0 && y[i] > 0) {
          sumK += K[indexI][j];
        }
      }
      if (sumK) {
        min += D[i][j] * K[i][j] / sumK;
        minX[i][j] = K[i][j] / sumK;
      }
    }
    min = min + H[i] * Math.ceil(sum / U);
  }
  return [min, minX];
}
/** 参数 
 * F设施数
 * C顾客数
 * U容量限制
 * H建造费用向量
 * D服务费用矩阵
*/

const F = Data.F;
const C = Data.C;
const U = Data.U;
const H = Data.H;
const D = Data.D;

// const F = 4;
// const C = 5;
// const U = 2;
// const H = [10, 29, 22, 16];
// const D = [
//   [3, 7, 12, 13, 14],
//   [17, 13, 14, 16, 17],
//   [14, 9, 9, 10, 6],
//   [15, 10, 8, 6, 3]
// ];

// const F = 4;
// const C = 5;
// const U = 2;
// const H = [8, 7, 6, 19];
// const D = [
//   [14, 8, 11, 10, 10],
//   [16, 16, 13, 14, 17],
//   [11, 5, 5, 7, 11],
//   [17, 6, 13, 19, 16]
// ];
console.log('H, D', H, D)
/**
 * cda算法
*/
// 初始化
let mustX = rand(F, C, [0, 1]);
let mustY = rand(1, F, [0, 1]);
let x = rand(F, C, [0, 1]);
let y = rand(1, F, [0, 1]);
// console.log('x, y', x, y);

/** 
 * 第一步：根据性质降阶
*/
// 性质2
let minIndex = H.indexOf(Math.min(...H));
for (let j = 0; j < C; j++) {
  let isFMustServerC = true;
  for (let i = 0; i < F; i++) {
    if (i !== minIndex && D[i][j] < H[minIndex] + D[minIndex][j]) {
      isFMustServerC = false;
      break;
    }
  }
  if (isFMustServerC) {
    mustX[minIndex][j] = 1;
    mustY[minIndex] = 1;
  }
}
// console.log('mustX, mustY', mustX, mustY);

// 性质3
for (let i = 0; i < F; i++) {
  for (let j = i + 1; j < F; j++) {
    if (H[i] <= H[j] && smaller(D[i], D[j])) {
      mustY[j] = -1;
    } else if (H[i] >= H[j] && bigger(D[i], D[j])) {
      mustY[i] = -1;
    }
  }
}
// console.log('mustX, mustY', mustX, mustY);

/** 
 * 第二步：计算竞争力函数矩阵
*/
x = copyMatrix(mustX);
y = copyMatrix(mustY);
let K = rand(F, C, [0, 1]);
let newCompete = () => {
  for (let i = 0; i < F; i++) {
    for (let j = 0; j < C; j++) {
      K[i][j] = compete(i, j, x, y, H, D);
    }
  }
  for (let i = 0; i < F; i++) {
    for (let j = 0; j < C; j++) {
      if (mustX[i][j]) {
        for (let newI = 0; newI < F; newI++) {
          if (!mustX[newI][j]) {
            K[newI][j] = 0;
          } else {
            K[newI][j] = 1;
          }
        }
      }
    }
    if (sumArr(mustX[i]) === U) {
      for (let newJ = 0; newJ < C; newJ++) {
        if (!mustX[i][newJ]) {
          K[i][newJ] = 0;
        } else {
          K[i][newJ] = 1;
        }
      }
    }
  }
}
let newCompeteSoft = () => {
  for (let i = 0; i < F; i++) {
    for (let j = 0; j < C; j++) {
      K[i][j] = competeSoft(i, j, x, y, H, D, U);
    }
  }
}
Mode ? newCompete() : newCompeteSoft();
// console.log('K', K);
/** 
 * 第三步：分配顾客
*/
const FacilityDistributeCustom = () => {
  for (let j = 0; j < C; j++) {
    const ConstKCol = column(K, j);
    let KCol = column(K, j);
    KCol.sort();
    for (let index = 0; index < F; index++) {
      // 如果根据数学性质当前顾客已有设施服务，则跳过顾客
      let mustXCol = column(mustX, j);
      if (sumArr(mustXCol) > 0) {
        continue;
      }
      let maxNum = KCol[KCol.length - 1 - index];
      let maxIndex = ConstKCol.indexOf(maxNum);
      if (sumArr(x[maxIndex]) < U) {
        x[maxIndex][j] = 1;
        y[maxIndex] = 1;
        break;
      }
    }
  }
}
FacilityDistributeCustom();
Mode ? newCompete() : newCompeteSoft();
// console.log('x', x);
/** 
 * 第四步：争夺顾客
*/
const FacilityCompeteCustom = (x, y) => {
  const MaxLoopTimes = 100;
  let loopTimes = 0;
  let cost = costFunction(x, H, D, U);
  while (loopTimes <= MaxLoopTimes) {
    let j = 0;
    for (j = 0; j < C; j++) {
      // 如果根据数学性质当前顾客已有设施服务，则跳过顾客
      let mustXCol = column(mustX, j);
      if (sumArr(mustXCol) > 0) {
        continue;
      }
      // 当前服务顾客的设施
      let xCol = column(x, j);
      let serverF = xCol.indexOf(1);
      // 更新竞争力函数
      x[serverF][j] = 0;
      if (sumArr(x[serverF]) === 0) {
        y[serverF] = 0;
      }
      Mode ? newCompete() : newCompeteSoft();
      /**
       * 争夺顾客  
      */
      // 竞争力最大的设施
      let KCol = column(K, j);
      let maxIndex = KCol.indexOf(Math.max(...KCol));
      // 如果竞争力最大的设施没有服务顾客
      if (serverF !== maxIndex) {
        // 强容量限制的设施选址问题中如果竞争力最大的设施容量已满，则换出竞争力最大的设施服务的一个顾客
        if (Mode && sumArr(x[maxIndex]) == U) {
          // 换出竞争力最大的设施服务的顾客中竞争力最小的一个顾客
          const ConstKRow = copyMatrix(K[maxIndex]);
          let KRow = copyMatrix(K[maxIndex]);
          let KRowMinNum, KRowMinIndex;
          KRow.sort();
          for (let index = 0; index < C; index++) {
            KRowMinNum = KRow[index];
            KRowMinIndex = ConstKRow.indexOf(KRowMinNum);
            if (x[maxIndex][KRowMinIndex] === 1) {
              x[maxIndex][KRowMinIndex] = 0;
              x[serverF][KRowMinIndex] = 1;
              break;
            }
          }
          // 分配顾客给设施
          x[maxIndex][j] = 1;
          y[serverF] = 1;
          // 如果分配顾客可以使总费用函数更小，则分配顾客给设施
          let newCost = costFunction(x, H, D, U);
          if (newCost < cost) {
            cost = newCost;
            break;
          } else {
            x[maxIndex][KRowMinIndex] = 1;
            x[serverF][KRowMinIndex] = 0;
            x[maxIndex][j] = 0;
            x[serverF][j] = 1;
            if (sumArr(x[serverF]) === 0) {
              y[serverF] = 0;
            }
          }
        } else {
          // 如果软容量限制的设施选址问题中或竞争力最大的设施容量未满，则分配顾客给设施
          x[maxIndex][j] = 1;
          y[maxIndex] = 1;
          // 如果分配顾客可以使总费用函数更小，则分配顾客给设施
          let newCost = costFunction(x, H, D, U);
          if (newCost < cost) {
            cost = newCost;
            break;
          }
        }
      } else {
        // 如果竞争力最大的设施已经服务顾客
        x[maxIndex][j] = 1;
        y[maxIndex] = 1;
      }
    }
    if (j === C) {
      break;
    }
    loopTimes++;
  }
}
FacilityCompeteCustom(x, y);
// console.log('x', x);
/** 
 * 第五步：资源交换
*/


Mode ? newCompete() : newCompeteSoft();

const FacilityExchangeCustom = () => {
  const MaxExchangeTimes = 100;
  let exchangeTimes = 0;
  let cost = costFunction(x, H, D, U);
  while (exchangeTimes < MaxExchangeTimes) {
    let newX = copyMatrix(x);
    let newY = copyMatrix(y);
    let first = rand(1, 1, [0, C]);
    let second = rand(1, 1, [0, C]);
    if (first !== second) {
      let firstCol = column(newX, first);
      let secondCol = column(newX, first);
      let firstIndex = firstCol.indexOf(1);
      let secondIndex = secondCol.indexOf(1);
      if (firstIndex !== secondIndex) {
        newX[firstIndex][second] = 1;
        newX[secondIndex][first] = 1;
        newX[firstIndex][first] = 0;
        newX[secondIndex][second] = 0
      }
      FacilityCompeteCustom(newX, newY);
      let newCost = costFunction(newX, H, D, U);
      if (newCost < cost) {
        x = newX;
        y = newY;
        cost = newCost;
      }
    }
    exchangeTimes++;
  }
}
FacilityExchangeCustom();
/** 
 * 第六步：输出结果
*/
let cost = costFunction(x, H, D, U);
// console.log('x', x);
console.log('cost', cost);

// 期望
Mode ? newCompete() : newCompeteSoft();
let [expectCost, expectCostX] = expectCostFunction(x, H, D, U);
// console.log('expectCostX', expectCostX);
console.log('expectCost', expectCost);

