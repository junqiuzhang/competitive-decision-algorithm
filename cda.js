// 随机矩阵
const rand = (x, y, scope) => {
  if (!scope || !scope.length || scope[0] > scope[1]) {
    console.log('Error: 未输入取值范围或取值范围错误');
    return null;
  }
  // 随机数组
  const randArray = (x, scope) => {
    // 随机数
    const randNumber = (scope) => {
      return Math.floor(Math.random() * (scope[1] - scope[0]) + scope[0]);
    }
    // 1 x 1数组
    if (x === 1) {
      return randNumber(scope);
    }
    // 1 x n数组
    let randArray = [];
    for (let i = 0; i < x; i++) {
      randArray.push(randNumber(scope));
    }
    return randArray;
  }
  // 1 x n矩阵
  if (x === 1) {
    return randArray(y, scope);
  }
  if (y === 1) {
    return randArray(x, scope);
  }
  // n x n矩阵
  let randMatrix = [];
  for (let i = 0; i < x; i++) {
    randMatrix.push(randArray(y, scope));
  }
  return randMatrix;
}
const bigger = (x, y) => {
  if (x.length !== y.length) {
    console.log('Error: 数组长度不相同');
    return null;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] < y[i]) {
      return false;
      break;
    }
  }
  return true;
}
const smaller = (x, y) => {
  if (x.length !== y.length) {
    console.log('Error: 数组长度不相同');
    return null;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] > y[i]) {
      return false;
      break;
    }
  }
  return true;
}
const column = (matrix, index) => {
  if (matrix.length === 0 || matrix[0].length === 0) {
    console.log('Error: 矩阵长度为0');
    return null;
  }
  if (matrix[0].length < index + 1) {
    console.log('Error: 索引超出矩阵长度');
    return null;
  }
  let column = [];
  for (let i = 0; i < matrix.length; i++) {
    column.push(matrix[index]);
  }
  return column;
}
const compete = (i, j, x, y, H, D) => {
  if (y[i] === 1) {
    return 1/D[i][j];
  }
  return 1/(H[i] + D[i][j]);
}
/** 参数 
 * F设施数
 * C顾客数
 * U容量限制
 * H建造费用向量
 * D服务费用矩阵
*/

const F = 4;
const C = 5;
const U = 2;
const H = rand(1, F, [5, 8]);
const D = rand(F, C, [30, 60]);
console.log('H, D', H, D)
/** cda算法
 * 
*/
// 初始化
let mustX = rand(F, C, [0, 1]);
let mustY = rand(1, F, [0, 1]);
let x = rand(F, C, [0, 1]);
let y = rand(1, F, [0, 1]);
// console.log('x, y', x, y);

// 第一步：根据性质降阶
// 性质2
let minIndex = H.indexOf(Math.min(...H));
for (let j = 0; j < C; j++) {
  let isFMustServerC = true;
  for (let i = 0; i < F; i++) {
    if (D[i][j] < H[minIndex] + D[minIndex][j]) {
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

// 第二步：计算竞争力函数矩阵
x = mustX;
y = mustY;
let K = rand(F, C, [0, 1]);

// 第三步：分配顾客

// 第四步：争夺顾客

// 第五步：资源交换

// 第六步：输出结果

// console.log(x, y);