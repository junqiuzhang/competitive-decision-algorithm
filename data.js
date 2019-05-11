const { rand } = require('./function');
/**
 * Mode: true--强容量限制， false--软容量限制
 */
const Mode = true;
const F = 4;
const C = 5;
const U = 2;
const MaxLoopTimes = 1;
const MaxExchangeTimes = 0;
let H = rand(1, F, [5, 15]);
let D = rand(F, C, [5, 10]);
const dataFunction = () => {
  let H = rand(1, F, [5, 15]);
  let D = rand(F, C, [5, 10]);
  return {
    Mode,
    F,
    C,
    U,
    H,
    D,
    MaxLoopTimes,
    MaxExchangeTimes,
  };
}
// 最初的算例
// H = [10, 29, 22, 16];
// D = [
//   [3, 7, 12, 13, 14],
//   [17, 13, 14, 16, 17],
//   [14, 9, 9, 10, 6],
//   [15, 10, 8, 6, 3]
// ];

// HCFLP
H =[ 12, 9, 13, 10 ]
D =[ [ 8, 6, 5, 6, 6 ],
  [ 6, 9, 5, 6, 5 ],
  [ 7, 5, 9, 6, 9 ],
  [ 6, 7, 9, 8, 7 ] ]

// SCFLP
// H = [ 8, 9, 9, 11 ];
// D = [ [ 8, 7, 9, 9, 8 ],
//   [ 9, 7, 9, 9, 6 ],
//   [ 7, 8, 7, 9, 8 ],
//   [ 6, 8, 9, 5, 8 ] ]
module.exports = {
  Mode, 
  F,
  C,
  U,
  H,
  D,
  MaxLoopTimes,
  MaxExchangeTimes,
  dataFunction,
}