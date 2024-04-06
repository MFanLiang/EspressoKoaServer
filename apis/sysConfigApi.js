const cp = require("child_process");
const { exit } = require("node:process");
const fs = require("fs");

const rundbSyncShell = async (ctx, next) => {
  return await new Promise((resolve, reject) => {
    cp.exec('node shell/dbSync.js', (err, stdout, stderr) => {
      if (err) {
        reject(ctx.response.body = {
          code: 500,
          data: 0,
          message: '模型同步失败，接口异常退出'
        });
      }
      resolve(ctx.response.body = {
        code: 200,
        data: 0,
        message: '所有模型均已同步完成',
        sysInfo: stdout
      });
    });
  })
};

module.exports = {
  rundbSyncShell,
};
