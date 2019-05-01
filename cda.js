// 随机矩阵
function rand(x, y, arr) {
  if (!arr || !arr.length || arr[0] >= arr[1]) {
    console.log('Error: 未输入取值范围或取值范围错误')；
    return null;
  }
  let matrix = [];
  for (let i = 0; i < x; i++) {
    let matrixRow = [];
    for (let j = 0; j < y; j++) {
      matrixRow.push(Math.floor(Math.random() * (arr[1] - arr[0]) + arr[1]));
    }
    matrix.push(matrixRow);
  }
  return matrix;
}
function bigger(x, y) {
  if (x.length !== y.length) {
    console.log('Error: 数组长度不相同');
    return null;
  }
  for (let i = 0; i < x.length; i++) {
    if (x[i] < y[i]) {
      return false;
    }
  }
  return true;
}
function column(matrix, index) {
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
const H = rand(1, F, [50, 100]);
const D = rand(F, C, [30, 50]);

/** cda算法
 * 
*/

// 第一步：根据性质降阶
// 性质2
let minIndex = H.findIndex(Math.min(...H));
let FMustServer = [];
for (let j = 0; j < C; j++) {
  let isFMustServerC = true;
  for (let i = 0; i < F; i++) {
    if (D[i][j] < H[minIndex] + D[minIndex][j]) {
      isFMustServerC = false;
    }
  }
  FMustServer.push(isFMustServerC);
}
console.log(FMustServer);
// 性质3

// 第二步：计算竞争力函数矩阵

// 第三步：分配顾客

// 第四步：争夺顾客

// 第五步：资源交换

// 第六步：输出结果
console.log(x, y);