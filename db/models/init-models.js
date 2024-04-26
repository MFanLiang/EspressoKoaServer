var DataTypes = require("sequelize").DataTypes;
var _coffee_list = require("./coffee_list");
var _dictionary = require("./dictionary");
var _menu_route = require("./menu_route");
var _online_token = require("./online_token");
var _user_manage = require("./user_manage");

function initModels(sequelize) {
  var coffee_list = _coffee_list(sequelize, DataTypes);
  var dictionary = _dictionary(sequelize, DataTypes);
  var menu_route = _menu_route(sequelize, DataTypes);
  var online_token = _online_token(sequelize, DataTypes);
  var user_manage = _user_manage(sequelize, DataTypes);

  menu_route.belongsTo(menu_route, { as: "parent_menu", foreignKey: "parent_menu_id"});
  menu_route.hasMany(menu_route, { as: "menus", foreignKey: "parent_menu_id"});
  online_token.belongsTo(user_manage, { as: "user", foreignKey: "user_id"});
  user_manage.hasMany(online_token, { as: "online_tokens", foreignKey: "user_id"});

  return {
    coffee_list,
    dictionary,
    menu_route,
    online_token,
    user_manage,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
