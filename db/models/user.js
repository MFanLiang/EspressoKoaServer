const { RESOURCE_URL } = require("../../config/serverConfig");
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "唯一主键"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      minlength: 2,
      comment: "用户名，唯一",
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      minlength: 6,
      maxlength: 16,
      comment: "用户的密码"
    },
    userFullName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户全称'
    },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: true, // 允许为空
      defaultValue: 1,
      comment: '用户角色'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, // 允许为空
      defaultValue: `${RESOURCE_URL}dog.png`,
      comment: '用户头像'
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false, // 是否允许为空
      minlength: 11,
      maxlength: 11,
      comment: '用户的手机号码'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '用户状态 (1 可用状态，0 注销不可用状态)'
    },
  }, {
    sequelize,
    tableName: 'user_manage',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
