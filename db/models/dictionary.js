const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('dictionary', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    dictid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "字典id"
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "字典名称"
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "值"
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
    }
  }, {
    sequelize,
    tableName: 'dictionary',
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
    ]
  });
};
