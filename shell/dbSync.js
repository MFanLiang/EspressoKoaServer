/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 12:35:00
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-06 17:57:19
 * @FilePath: \koa-generator\shell\dbSync.js
 * @Description: 数据模型同步脚本
 */

const sequelize = require("../db/sequelize.js");
const { exit } = require("node:process");
require("../db/models/init-models.js")(sequelize);

sequelize
  .sync({
    force: false // 如果表已经存在，则删除表后再创建
  })
  .then(result => {
    console.log('所有模型均已成功同步');
    exit(0); // 指示 Node.js 以 code 的退出状态同步终止进程，当前为正常退出终止进程
  })
  .catch(err => {
    console.log('所有模型均已同步失败');
    console.log(err);
  });
