const requireDirectory = require('require-directory')
const router = require('koa-router')

class InitManager {
  static initCore (app) {
    // * 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
  }

  static initLoadRouters () {
    function whenLoadModule (obj) {
      if (obj instanceof router) {
        InitManager.app.use(obj.routes())
      } else if (typeof obj === 'object') {
        for (let k in obj) {
          if (obj[k] instanceof router) {
            InitManager.app.use(obj[k].routes())
          }
        }
      }
    }
    // * 拼接绝对路径
    const apiDirectory = `${process.cwd()}/routes`;
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })
  }
};

module.exports = InitManager;
