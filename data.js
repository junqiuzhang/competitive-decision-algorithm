const { rand } = require('./function');
const F = 5;
const C = 5;
const U = 2;
const H = rand(1, F, [10, 20]);
const D = rand(F, C, [5, 20]);
// console.log(H);
// console.log(D);

exports.F = F;
exports.C = C;
exports.U = U;
exports.H = H; 
exports.D = D; 