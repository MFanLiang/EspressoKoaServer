const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('menu_route', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
      comment: "唯一主键"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "路由名称标题，唯一",
      unique: "name"
    },
    alias: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: "/",
      comment: "路由别名路径"
    },
    icon: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "路由icon图标"
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1,
      comment: "路由状态 (1 可用状态，0 不可用状态)"
    },
    parentMenuId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: true,
      references: {
        model: 'menu_route',
        key: 'id'
      },
      comment: "指向父级分类的ID，如果是父级分类则为null，如果是子分类则为父级分类的ID"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "菜单排序的序列"
    },
    isLink: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
      comment: "链接地址"
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
    tableName: 'menu_route',
    timestamps: false,
    comment: "目录菜单路由表",
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
        name: "parent_menu_id",
        using: "BTREE",
        fields: [
          { name: "parent_menu_id" },
        ]
      },
      {
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
