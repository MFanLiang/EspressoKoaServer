const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('online_token', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "唯一主键"
    },
    token: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      references: {
        model: 'user_manage',
        key: 'id'
      }
    },
    ipAddress: {
      type: DataTypes.STRING(36),
      allowNull: true,
      comment: "设备登录IP地址"
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
    tableName: 'online_token',
    timestamps: false,
    comment: "内嵌令牌表",
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
