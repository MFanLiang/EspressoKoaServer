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
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      references: {
        model: 'user_manage',
        key: 'id'
      }
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "更新时间"
    },
    ip_address: {
      type: DataTypes.STRING(36),
      allowNull: true,
      comment: "设备登录IP地址"
    }
  }, {
    sequelize,
    tableName: 'online_token',
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
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
