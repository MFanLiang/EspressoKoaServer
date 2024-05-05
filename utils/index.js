/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-02 22:16:39
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-30 02:15:42
 * @FilePath: \EspressoKoaServer\utils\index.js
 * @Description: 公共工具函数库
 */

const os = require('os');

/**
 * @description 模拟网络延迟返回
 * @param time 指定的延迟时间(单位: ms)
 * @returns Promise
 */
async function useDelay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
};

/**
 * @description 获取本地计算机的ip地址
 * @returns string
 */
function getLocalIP() {
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

/**
 * @description 格式化源数据
 * @returns Object
 */
function formatSourceContent(content) {
  return JSON.parse(JSON.stringify(content));
};

/**
 * @description 转换数据结构
 * @param menuItems 菜单项
 * @param parentId 父节点id
 * @returns Array
 */
function transformDataStructure(menuItems, parentId = null) {
  const result = [];
  for (const item of menuItems) {
    if (item.parentMenuId === parentId) {
      const menuItem = { ...item, status: item.status === 1 ? true : false }
      const children = transformDataStructure(menuItems, item.id);
      if (children.length) {
        menuItem.children = children;
      }
      result.push(menuItem);
    }
  }
  return result;
};

module.exports = {
  useDelay,
  getLocalIP,
  formatSourceContent,
  transformDataStructure
};
