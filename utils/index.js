/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-02 22:16:39
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 13:32:59
 * @FilePath: \koa-generator\utils\index.js
 * @Description: 公共工具函数库
 */

const os = require('os');

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
        // * 判断计算机系统网络环境为网线直连模式
        if (dev === '本地连接' || dev === '以太网') {
          for (let j = 0; j < netInfo[dev].length; j++) {
            if (netInfo[dev][j].family === 'IPv4') {
              ip = netInfo[dev][j].address;
              break;
            }
          }
        }
        // * 判断计算机系统网络环境为 WIFI 网卡连接模式
        if (dev === 'WLAN') {
          for (let k = 0; k < netInfo[dev].length; k++) {
            if (netInfo[dev][k].family === 'IPv4') {
              ip = netInfo[dev][k].address;
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
