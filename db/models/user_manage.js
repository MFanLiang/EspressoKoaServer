const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user_manage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "用户列表唯一主键"
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户名，唯一",
      unique: "user_name"
    },
    passWord: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户的密码"
    },
    userFullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户全称"
    },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      comment: "用户角色"
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "https:\/\/xiaomenglovecoffee.top\/staticdata\/dog.png",
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
      defaultValue: 1,
      comment: "用户状态 (1 可用状态，0 注销不可用状态)"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'user_manage',
    timestamps: false,
    comment: "用户管理表",
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
        name: "user_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_name" },
        ]
      },
      {
        name: "id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
