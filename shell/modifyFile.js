/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-16 21:41:56
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-25 00:05:14
 * @FilePath: \EspressoKoaServer\shell\modifyFile.js
 * @Description: serverConfig服务系统配置文件的运行脚本
 */

const fs = require("node:fs");
const { argv } = require("node:process");
const { resolve } = require("node:path");

function findPointerIndex(lines, value) {
  let index = lines.findIndex(ele => {
    if (!ele.split(":")[0].trim().includes(value.split(":")[0])) return false;
    return true
  });
  return index;
};

function modifyFile(filePath, newContent) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log("Error reading file: ", err);
    }

    let lines = data.split('\n');

    const sd = newContent.map((item) => {
      return findPointerIndex(lines, item);
    });

    sd.forEach((lineNum, index) => {
      lines[lineNum] = `    ${newContent[index]}`
    });

    fs.writeFile(filePath, lines.join('\n'), 'utf8', (err) => {
      if (err) {
        return console.error('Invalid Failed', err);
      }
      console.log('配置文件已更新完毕！')
    });
  })
};

let argument = argv.splice(2);
let [arg1, arg2, arg3, arg4] = argument;
modifyFile(resolve(__dirname, '../config/serverConfig.js'), [
  `HOST: '${arg1}',`,
  `USER: '${arg2}',`,
  `PASSWORD: '${arg3}',`,
  `DB: '${arg4}',`
]);
