var DataTypes = require("sequelize").DataTypes;
var _coffeelist = require("./coffeelist");
var _user = require("./user");

function initModels(sequelize) {
  var coffeelist = _coffeelist(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    coffeelist,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
