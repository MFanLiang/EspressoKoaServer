/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-07 13:31:56
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 13:32:03
 * @FilePath: \koa-generator\utils\encryption.js
 * @Description: 密码加解密工具函数
 */

const bcrypt = require('bcryptjs');

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
