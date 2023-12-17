const Sequelize = require('sequelize');
const { mysql_config } = require('../config/serverConfig');

// 创建连接 MySQL 的实例
const mysql_sequelize = new Sequelize(mysql_config.DB, mysql_config.USER, mysql_config.PASSWORD, {
  host: mysql_config.HOST,
  port: mysql_config.port,
  dialect: mysql_config.dialect,
  pool: {
    max: mysql_config.pool.max,
    min: mysql_config.pool.min,
    acquire: mysql_config.pool.acquire,
    idle: mysql_config.pool.idle
  },
  logging: (...msg) => {
    if (process.env.NODE_ENV === 'development') {
      // console.log('@服务日志消息@', msg);
    }
  },
})

// 测试数据库连接
try {
  mysql_sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
};

const sequelizeDB = {};

sequelizeDB.Sequelize = Sequelize;
sequelizeDB.mysql_sequelize = mysql_sequelize;

// 注册并使用用户模型数据
sequelizeDB.userSchema = require('../models/userSchema')(mysql_sequelize, Sequelize);
sequelizeDB.coffeeSchema = require('../models/coffeeSchema')(mysql_sequelize, Sequelize);

module.exports = sequelizeDB;
