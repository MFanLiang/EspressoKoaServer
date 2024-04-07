/*
 * @Author: xiaomengge && xiaomengge777076@163.com
 * @Date: 2024-04-06 11:19:02
 * @LastEditors: xiaomengge && xiaomengge777076@163.com
 * @LastEditTime: 2024-04-07 14:19:55
 * @FilePath: \koa-generator\db\sequelize.js
 * @Description: Sequelize 实例运行脚本
 */

const Sequelize = require('sequelize');
const { mysql_config } = require('../config/serverConfig');

// * 创建连接 MySQL 的实例
const sequelize = new Sequelize(mysql_config.DB, mysql_config.USER, mysql_config.PASSWORD, {
  host: mysql_config.HOST, // 数据库地址
  port: mysql_config.port, // 数据库端口
  dialect: mysql_config.dialect, // 指定连接的数据库类型
  timezone: mysql_config.timezone, // 时区，如果没有设置，会导致数据库中的时间字段与中国时区时间相差8小时
  pool: {
    max: mysql_config.pool.max,
    min: mysql_config.pool.min,
    acquire: mysql_config.pool.acquire,
    idle: mysql_config.pool.idle
  },
  logging: (...msg) => {
    // 控制台日志打印，生产环境下不打印
    if (process.env.NODE_ENV === 'development') {
      // console.log('@服务日志消息@', msg);
    } else {
      return false;
    }
  },
  // 解决中文输入问题
  define: {
    timestamps: false, // 是否自动创建时间字段， 默认会自动创建createdAt、updatedAt
    paranoid: false, // 是否自动创建deletedAt字段
    // createdAt: 'createTime', // 重命名字段
    // updatedAt: 'updateTime',
    // deletedAt: 'deleteTime',
    underscored: true, // 开启下划线命名方式，默认是驼峰命名
    freezeTableName: true, // 禁止修改表名
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_0900_ai_ci'
    }
  }
});

// * 测试数据库连接
try {
  sequelize.authenticate();
  console.log('Mysql connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database, Error output: ', error);
};

module.exports = sequelize;
