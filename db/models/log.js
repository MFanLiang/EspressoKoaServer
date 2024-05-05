const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('log', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "日志唯一主键"
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "日志类型"
    },
    ipAddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "访问的IP地址"
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      comment: "用户的id",
      field: 'user_id'
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "请求的方法"
    },
    originalUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "请求接口",
      field: 'original_url'
    },
    point: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "坐标"
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "所在地"
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
    tableName: 'log',
    timestamps: false,
    comment: "系统的操作日志的表",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
