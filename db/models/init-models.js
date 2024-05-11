var DataTypes = require("sequelize").DataTypes;
var _coffee_list = require("./coffee_list");
var _menu_route = require("./menu_route");
var _online_token = require("./online_token");
var _user_manage = require("./user_manage");
var _sys_dict_type = require("./sys_dict_type");
var _sys_dict_data = require("./sys_dict_data");
var _user_menu = require("./user_menu");
var _log = require("./log");
var _files_info = require("./files_info");

function initModels(sequelize) {
  var coffee_list = _coffee_list(sequelize, DataTypes);
  var menu_route = _menu_route(sequelize, DataTypes);
  var online_token = _online_token(sequelize, DataTypes);
  var user_manage = _user_manage(sequelize, DataTypes);
  var sys_dict_type = _sys_dict_type(sequelize, DataTypes);
  var sys_dict_data = _sys_dict_data(sequelize, DataTypes);
  var user_menu = _user_menu(sequelize, DataTypes);
  var log = _log(sequelize, DataTypes);
  var files_info = _files_info(sequelize, DataTypes);

  menu_route.belongsTo(menu_route, { as: "parent_menu", foreignKey: "parent_menu_id" });
  menu_route.hasMany(menu_route, { as: "menus", foreignKey: "parent_menu_id" });
  online_token.belongsTo(user_manage, { as: "user", foreignKey: "user_id" });
  user_manage.hasMany(online_token, { as: "online_tokens", foreignKey: "user_id" });
  user_menu.hasMany(user_manage, { as: "um1", foreignKey: "id" });
  user_menu.hasMany(menu_route, { as: "mr1", foreignKey: "id" });
  user_manage.hasMany(files_info, { as: "file_infos", foreignKey: "uploader" });

  return {
    coffee_list,
    menu_route,
    online_token,
    user_manage,
    sys_dict_type,
    sys_dict_data,
    user_menu,
    log,
    files_info
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
