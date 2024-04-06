var DataTypes = require("sequelize").DataTypes;
var _user = require("./user");

function initModels(sequelize) {
  var user = _user(sequelize, DataTypes);


  return {
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
