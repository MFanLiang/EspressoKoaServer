/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 17:24:08
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-06 17:24:12
 * @FilePath: \koa-generator\db\index.js
 * @Description: 数据模型入口文件
 */

const sequelize = require("./sequelize");

const initModels = require("./models/init-models");
const models = initModels(sequelize);

module.exports = models;
