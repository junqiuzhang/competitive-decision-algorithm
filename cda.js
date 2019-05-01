// 随机矩阵
export function rand(x, y) {
  let matrix = [];
  for (let i = 0; i < x; i++) {
    let matrixRow = [];
    for (let j = 0; j < y; j++) {
      matrixRow.push(Math.random());
    }
    matrix.push(matrixRow);
  }
  return matrix;
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
const H = rand(1, F);
const D = rand(F, C);

/** cda算法
 * 
*/

// 第一步：根据性质降阶
// 性质2
let minNum = Math.min(...H);
let minIndex = H.findIndex(minNum);
for (let j = 0; j < C; j++) {
  
  for (let i = 0; i < F; i++) {
    if () 
  }
}
// 性质3

// 第二步：计算竞争力函数矩阵

// 第三步：分配顾客

// 第四步：争夺顾客

// 第五步：资源交换

// 第六步：输出结果
console.log(x, y);