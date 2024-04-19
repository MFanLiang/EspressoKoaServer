/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 13:31:56
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 13:32:03
 * @FilePath: \koa-generator\utils\encryption.js
 * @Description: 密码加解密工具函数
 */

const NodeRSA = require("node-rsa");

// * rsa加密
const key = new NodeRSA({ b: 512 });
key.setOptions({ encryptionScheme: "pkcs1" });

module.exports = {
  encryptPassword,
  decodePassword,
  key
};
