const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_manage', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      comment: "唯一主键"
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户名，唯一",
      unique: "username"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户的密码"
    },
    user_full_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "用户全称"
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "用户角色"
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "http:\/\/192.168.10.208:5050\/dog.png",
      comment: "用户头像"
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户的手机号码"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "用户状态 (1 可用状态，0 注销不可用状态)"
    }
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
