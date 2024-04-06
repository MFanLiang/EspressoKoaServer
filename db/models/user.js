const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.STRING(64),
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "用户名，唯一",
      unique: "user_name"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "密码"
    },
    is_cancel: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "状态 0：有效，1：失效"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
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
    ]
  });
};
