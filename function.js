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
// 复制矩阵
const copyMatrix = (x) => {
  const copyArray = (x) => {
    let yArray = [];
    for (let j = 0; j < x.length; j++) {
      yArray.push(x[j]);
    }
    return yArray;
  }
  // 1 x n矩阵
  if (typeof x[0] === 'number') {
    return copyArray(x);
  }
  // n x n矩阵
  let y = [];
  for (let i = 0; i < x.length; i++) {
    y.push(copyArray(x[i]));
  }
  return y;
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
// 获取矩阵的一列
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
    column.push(matrix[i][index]);
  }
  return column;
}
// 数组求和
const sumArr = (arr) => {
  if (!arr || !arr.length) {
    console.log('Error:参数应为数组');
    return null;
  }
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
exports.rand = rand;
exports.copyMatrix = copyMatrix;
exports.bigger = bigger;
exports.smaller = smaller;
exports.column = column;
exports.sumArr = sumArr;

