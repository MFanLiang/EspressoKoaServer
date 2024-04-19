const cp = require("child_process");

const rundbSyncShell = async (ctx, next) => {
  return await new Promise((resolve, reject) => {
    cp.exec('node shell/dbSync.js', (err, stdout, stderr) => {
      if (stdout.includes("所有模型均已同步失败")) {
        reject(ctx.response.body = {
          code: 500,
          data: "",
          msg: '模型同步失败，接口异常退出',
          info: stdout
        });
      } else {
        resolve(ctx.response.body = {
          code: 200,
          data: 0,
          msg: '所有模型均已同步完成',
          sysInfo: stdout
        });
      }
    });
  })
};

module.exports = {
  rundbSyncShell,
};
