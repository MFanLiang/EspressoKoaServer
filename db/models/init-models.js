var DataTypes = require("sequelize").DataTypes;
var _coffee_list = require("./coffee_list");
var _user_manage = require("./user_manage");

function initModels(sequelize) {
  var coffee_list = _coffee_list(sequelize, DataTypes);
  var user_manage = _user_manage(sequelize, DataTypes);


  return {
    coffee_list,
    user_manage,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
