const fs = require('fs');

let dateStr = new Date().getTime();
let fileName = `log-${dateStr}.txt`;

const writeFile = (content) => {
  fs.writeFile(fileName, content, { flag: 'a' }, function (err) {
    if (err) {
      return console.error(err);
    }
    // fs.readFile('input.txt', function (err, data) {
    //    if (err) {
    //       return console.error(err);
    //    }
    //    console.log(data.toString());
    // });
  });
}
module.exports = {
  writeFile,
}