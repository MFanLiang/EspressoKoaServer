/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 13:34:03
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 13:35:53
 * @FilePath: \koa-generator\utils\IO_Operate.js
 * @Description: IO 操作工具函数
 */

const path = require('path');
const fs = require('fs');

// * 传入文件夹的路径看是否存在，存在不用管，不存在则直接创建文件夹
/**
 * 判断文件夹是否存在，不存在可以直接创建
 * @param reaPath {String} 文件路径
 * @returns {Promise<boolean>}
 */
exports.exitsAsyncFolder = async function (reaPath) {
  const absPath = path.resolve(__dirname, reaPath);
  try {
    await fs.promises.stat(absPath)
    return;
  } catch (e) {
    // * 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
    await fs.promises.mkdir(absPath, { recursive: true })
  }
};

exports.exitsFolder = async function (reaPath) {
  const absPath = path.resolve(__dirname, reaPath);
  // * 获取文件信息
  fs.stat(absPath, function (err, stats) {
    if (!stats) {
      // * 若找不到时创建目录
      fs.mkdir(absPath, { recursive: true }, err => {
        if (err) throw err;
      });
    }
  });
};
