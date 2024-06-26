/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 11:22:07
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-27 00:04:35
 * @FilePath: \EspressoKoaServer\config\serverConfig.js
 * @Description: 全局基础服务配置文件。文件级别：配置文件
 */

const path = require('path');
const { getLocalIP } = require('../utils');

/** 数据库基本配置信息 */
const getMysqlConfig = () => {
  let sqlConfig = null;
  let sqlBaseConfig = {
    /** 主机地址 */
    HOST: 'localhost',
    /** 数据库用户名 */
    USER: 'root',
    /** 数据库密码 */
    PASSWORD: 'xiaomengge',
    /** 数据库名称 */
    DB: 'sys_network',
    /** 数据库端口号 */
    port: '3306',
    // 连接数据库的方言(One of mysql, postgres, sqlite, db2, mariadb and mssql.)
    dialect: 'mysql',
    // 时区，如果没有设置，会导致数据库中的时间字段与中国时区时间相差8小时
    timezone: '+08:00',
    pool: {
      /** 最大连接数 */
      max: 5,
      /** 最小连接数 */
      min: 0,
      /** 超时时间 */
      acquire: 30000,
      /** 空闲时间 */
      idle: 10000
    }
  };

  if (process.env.NODE_ENV === "development" || "development") {
    // 开发环境
    sqlConfig = { ...sqlBaseConfig };
  } else {
    // 生产环境
    sqlConfig = { ...sqlBaseConfig, HOST: "116.63.24.17" };
  }
  return sqlConfig;
};

/** 数据库配置 */
let mysql_config = getMysqlConfig();

/** 上传后资源的 url 地址 */
const RESOURCE_URL = `http://${getLocalIP()}:${process.env.PORT || '5050'}/`;

/** 存储上传图片文件的目录 */
const UPLOAD_DIRIMGS = path.join(__dirname, '../public/images');

/** 存储上传的文件的目录 */
const UPLOAD_DIRFILES = path.join(__dirname, "../public/docs");

/** 刷新 token 提前时间，单位：秒 */
const refreshTime = 180;

/** token 有效时间，单位：秒 */
// 如果是使用字符串情况下，需要确保提供时间的单位，例如："2 days" 表示两天, "10h" 表示10个小时, "7d" 表示7天, "3m" 表示三分钟
const expiresInTime = "10h";

/** 路由接口白名单(特殊的接口地址，不需要验证 jwt) */
const WHITELIST = [
  "/",
  "/coffee/user/login",
  "/coffee/user/register",
  "/swagger-ui",
  "/swagger.yaml",
  "/coffee/rundbSyncShell",
  "/coffee/send-email",
  "/coffee/security/publicKey",
];

// * 分量导出所有服务运行时配置变量
module.exports = {
  mysql_config,
  RESOURCE_URL,
  UPLOAD_DIRIMGS,
  UPLOAD_DIRFILES,
  refreshTime,
  expiresInTime,
  WHITELIST
};
