const h = [10, 29, 22, 16];
const c = [
  [3,7,12,13,14],
  [17,13,14,16,17],
  [14,9,9,10,6],
  [15,10,8,6,3]
];
let calcx = (j1, j2, j3, j4, j5) => {
  let x = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ];
  x[j1][0] = 1;
  x[j2][1] = 1;
  x[j3][2] = 1;
  x[j4][3] = 1;
  x[j5][4] = 1;
  return x;
}
let check = x => {
  let che = true;
  let i, j, sum;
  for(i = 0; i < x.length; i++){
    xi = x[i];
    sum = 0;
    for(j = 0; j < xi.length; j++){
      sum += xi[j];
    }
    if(sum > 2){
      che = false;
    }
  }
  return che;
}
let calcmin = x => {
  let i, j, sum, min = 0;
  for(i = 0; i < x.length; i++){
    xi = x[i];
    sum = 0;
    for(j = 0; j < xi.length; j++){
      sum += xi[j];
      if(xi[j]){
        min += c[i][j];
      }
    }
    // 强容量限制保留1，弱容量限制保留2
    // 1
    // if(sum > 0){
    //   min += h[i];
    // }

    // 2    
    if(sum > 0 && sum <= 2){
      min += h[i];
    }else if(sum > 2 && sum <= 4){
      min += 2*h[i];
    }else if(sum > 4 && sum <= 6){
      min += 3*h[i];
    }
  }
  return min;
}
let j1, j2, j3, j4, j5, min = 1000;
for(j1 = 0; j1 < 4; j1++) {
  for(j2 = 0; j2 < 4; j2++) {
    for(j3 = 0; j3 < 4; j3++) {
      for(j4 = 0; j4 < 4; j4++) {
        for(j5 = 0; j5 < 4; j5++) {
          let x = calcx(j1, j2, j3, j4, j5);
          // 强容量限制保留，弱容量限制注释
          // if(check(x)){
            if(calcmin(x) < min){
              min = calcmin(x);
              console.log(x, min)
            }
          // }
        }
      }
    }
  }
}
// console.log(min)