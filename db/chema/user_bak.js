/** 用户相关的数据模型 */
const { RESOURCE_URL } = require('../../config/serverConfig');

const userSchema = (mysql_sequelize, Sequelize) => {
  const { DataTypes } = Sequelize;

  // 注意：
  // Sequelize 在根据模型创建表的时候, 会自动将指定的表的名称变成复数
  // Sequelize 在根据模型创建表的时候, 会自动增加两个字段 createAt / updateAt

  // 第一个参数：用于指定 表的名称
  // 第二个参数：用于指定 表中有哪些字段
  // 第三个参数：用于配置 表的一些额外信息
  const user = mysql_sequelize.define("user_manage", {
    id: {
      type: DataTypes.UUID, // 数据类型，须遵循 mysql 的数据类型原则
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true, // 是否为主键
      unique: true, // 是否必须唯一
      comment: '唯一主键'
    },

    // 用户名
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      minlength: 2,
      maxlength: 20,
      comment: '用户名称'
    },

    // 密码
    password: {
      type: DataTypes.STRING(255),
      allowNull: false, // 是否允许为空
      minlength: 6,
      maxlength: 16,
      comment: '密码'
    },

    // 用户全称
    userFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户全称'
    },

    // 用户角色
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: true, // 允许为空
      defaultValue: 1,
      comment: '用户角色'
    },

    // 用户头像
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, // 允许为空
      defaultValue: `${RESOURCE_URL}dog.png`,
      comment: '用户头像'
    },

    // 用户的手机号码
    tel: {
      type: DataTypes.STRING,
      allowNull: false, // 是否允许为空
      minlength: 11,
      maxlength: 11,
      comment: '用户的手机号码'
    },

    // 用户状态 (1 可用状态，0 注销不可用状态)
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: '用户状态 (1 可用状态，0 注销不可用状态)'
    },

    // 用户创建时间
    createDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: '用户创建时间'
    }
  }, {
    sequelize: mysql_sequelize,
    // 是否自动添加 createdAt / updateAt 字段
    timestamps: false,
    // 是否禁止自动将表名修改为复用
    freezeTableName: true,
    // 是否自定义表名
    tableName: false
  });

  return user;
};

module.exports = userSchema;
