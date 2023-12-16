const path = require('path');
const { getLocalIP } = require('../utils');

/** 读取数据库配置 */
const getMysqlConfig = () => {
  let sqlConfig;
  if (process.env.NODE_ENV === 'development') {
    // 开发环境
    sqlConfig = {
      // 主机地址
      HOST: 'localhost',
      // 数据库用户名
      USER: 'root',
      // 数据库密码
      PASSWORD: 'xiaomengge',
      // 数据库名称
      DB: 'sys_network',
      // 数据库端口号
      port: '3306',
      // 连接数据库的方言(One of mysql, postgres, sqlite, db2, mariadb and mssql.)
      dialect: "mysql",
      pool: {
        // 最大连接数
        max: 5,
        // 最小连接数
        min: 0,
        // 超时时间
        acquire: 30000,
        // 空闲时间
        idle: 10000
      }
    }
  } else {
    // 生产环境
    sqlConfig = {
      // 主机地址
      HOST: 'localhost',
      // 数据库用户名
      USER: 'root',
      // 数据库密码
      PASSWORD: 'xiaomengge',
      // 数据库名称
      DB: 'sys_network',
      // 数据库端口号
      port: '3306',
      // 连接数据库的方言(One of mysql, postgres, sqlite, db2, mariadb and mssql.)
      dialect: "mysql",
      pool: {
        // 最大连接数
        max: 5,
        // 最小连接数
        min: 0,
        // 超时时间
        acquire: 30000,
        // 空闲时间
        idle: 10000
      }
    }
  }
  return sqlConfig;
};

/** 服务配置 */
const app = {
  // 服务端口
  port: process.env.PORT || 3030,
};

/** 数据库配置 */
let mysql_config = getMysqlConfig();

/** 上传后资源的 url 地址 */
const RESOURCE_URL = `http://${getLocalIP()}:${process.env.PORT || '5050'}/`;

/** 存储上传图片文件的目录 */
const UPLOAD_DIRIMGS = path.join(__dirname, '../public/images');

// 分量导出所有服务运行时配置变量
module.exports = {
  app,
  mysql_config,
  RESOURCE_URL,
  UPLOAD_DIRIMGS
};
