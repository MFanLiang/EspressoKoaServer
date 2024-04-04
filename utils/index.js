/** 函数工具库 */
const path = require('path');
const fs = require('fs');
const os = require('os');
const bcrypt = require('bcryptjs');

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
    // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
    await fs.promises.mkdir(absPath, { recursive: true })
  }
};

exports.exitsFolder = async function (reaPath) {
  const absPath = path.resolve(__dirname, reaPath);

  fs.stat(absPath, function (err, stats) {
    if (!stats) {
      fs.mkdir(absPath, { recursive: true }, err => {
        if (err) throw err;
      }); //Create dir in case not found
    }
  });
};

/**
 * 延时执行
 * 模拟网络延迟返回
 * */
exports.useDelay = async function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
};

/** 获取本地计算机的ip地址 */
exports.getLocalIP = function () {
  // * 获取当前的操作系统类型 Windows_NT(windows操作系统) ｜ Linux(Linux操作系统) ｜ Darwin(Mac操作系统)
  const osType = os.type();

  // * 获取网络信息
  const netInfo = os.networkInterfaces();

  // * 定义ip地址变量做存储
  let ip = '';

  switch (osType) {
    case 'Windows_NT':
      for (let dev in netInfo) {
        // win7的网络信息中显示为本地连接，win10显示为以太网
        if (dev === '本地连接' || dev === '以太网') {
          for (let j = 0; j < netInfo[dev].length; j++) {
            if (netInfo[dev][j].family === 'IPV4') {
              ip = netInfo[dev][j].address;
              break;
            }
          }
        }
      }
      break;
    case 'Linux':
      ip = netInfo.eth0[0].address;
      break;
    case 'Darwin':
      for (let o = 0; o < netInfo.en0.length; o++) {
        if (netInfo.en0[o].family === 'IPv4') {
          ip = netInfo.en0[o].address;
        }
      }
      break;
    default:
      break;
  }
  return ip;
};

/** 加密密码口令 */
exports.encryptPassword = async function (passwordVal) {
  // * 创建加密前的盐
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(passwordVal, salt);
};

/** 解密密码口令 */
exports.decodePassword = async function (originVal, cryptograph) {
  return bcrypt.compareSync(originVal, cryptograph);
};
