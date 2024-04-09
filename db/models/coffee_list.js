const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('coffee_list', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "唯一主键"
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "咖啡具的名称"
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: "颜色值"
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "数量"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "价格"
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "描述信息"
    },
    type: {
      type: DataTypes.STRING(1),
      allowNull: true,
      comment: "类型"
    },
    is_flush: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "是否需要冲洗"
    },
    is_hot: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "是否会变热"
    },
    author: {
      type: DataTypes.STRING(15),
      allowNull: true,
      comment: "提交作者"
    },
  }, {
    sequelize,
    tableName: 'coffee_list',
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
