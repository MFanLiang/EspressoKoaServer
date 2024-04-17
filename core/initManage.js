/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2023-09-06 10:16:49
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 14:33:29
 * @FilePath: \koa-generator\core\initManage.js
 * @Description: 自动加载路由能力
 */

const requireDirectory = require('require-directory');
const router = require('koa-router');

class InitManager {
  static initCore(app) {
    // * 入口方法
    InitManager.app = app;
    InitManager.initLoadRouters();
  }

  static initLoadRouters() {
    function whenLoadModule(obj) {
      if (obj instanceof router) {
        // * 路由黑名单
        const blackRoutesList = [];
        const prefix = obj.opts.prefix;
        if (!blackRoutesList.includes(prefix)) {
          InitManager.app.use(obj.routes());
        }
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
    const modules = requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    });
  }

  // * 加载系统服务全局配置文件
  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/config/serverConfig.js';
    const config = require(configPath);
    global.config = config;
  }

  // * 加载 http 异常处理
  static loadHttpException() {
    const errors = require('./http-exception');
    global.err = errors;
  }
};

module.exports = InitManager;
