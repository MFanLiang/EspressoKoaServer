const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('sys_dist_data', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "字典数据表的主键id"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "字典排序的序列"
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "字典标签"
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "字典键值"
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      comment: "字典类型"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "字典状态 (1 可用，0 停用)"
    },
    remark: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: "",
      comment: "字典备注解释"
    },
    createBy: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: "",
      comment: "创建者"
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "创建时间"
    },
    updateBy: {
      type: DataTypes.STRING(64),
      allowNull: true,
      defaultValue: "",
      comment: "更新者"
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "更新时间"
    }
  }, {
    sequelize,
    tableName: 'sys_dict_data',
    timestamps: false,
    comment: "系统字典的数据表",
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
