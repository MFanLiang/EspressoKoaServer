/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 12:02:41
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-06 12:05:01
 * @FilePath: \koa-generator\env\env.config.js
 * @Description: nodeJs 环境变量的 env 配置文件
 */

const dotenv = require("dotenv");
const path = require("path");

const envConfig = dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV === "development" ? "./.env.dev" : "./env.prod"), // 配置文件路径
  encoding: 'utf8', // 编码方式，默认utf8
  debug: false, // 是否开启debug，默认false
}).parsed;

if (!envConfig) {
  console.log('配置文件不存在');
  // 退出程序
  process.exit(1);
};
