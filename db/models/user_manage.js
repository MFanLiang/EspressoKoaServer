const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_manage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "用户列表唯一主键"
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
      allowNull: false,
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
      defaultValue: "https:\/\/116.63.42.17\/staticdata\/dog.png",
      comment: "用户头像"
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户的手机号码"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
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
