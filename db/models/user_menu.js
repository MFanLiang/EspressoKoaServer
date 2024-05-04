const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) { 
  return sequelize.define('user_menu', {
    userBeFromId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      comment: "用户表外引主键",
      references: {
        model: 'user_manage',
        key: 'id'
      }
    },
    menuBeFromId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      comment: "菜单表外引主键",
      references: {
        model: 'menu_route',
        key: 'id'
      }
    },
  }, {
    sequelize,
    tableName: 'user_menu',
    timestamps: false,
    comment: "用户-菜单的关联表",
  });
};
