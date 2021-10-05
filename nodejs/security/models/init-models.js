var DataTypes = require("sequelize").DataTypes;
var _Profile = require("./Profile");
var _Role = require("./Role");
var _User = require("./User");
var _UserRoles = require("./UserRoles");

function initModels(sequelize) {
  var Profile = _Profile(sequelize, DataTypes);
  var Role = _Role(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var UserRoles = _UserRoles(sequelize, DataTypes);

  Role.belongsToMany(User, { as: 'User_Id_Users', through: UserRoles, foreignKey: "Role_Id", otherKey: "User_Id" });
  User.belongsToMany(Role, { as: 'Role_Id_Roles', through: UserRoles, foreignKey: "User_Id", otherKey: "Role_Id" });
  UserRoles.belongsTo(Role, { as: "Role", foreignKey: "Role_Id"});
  Role.hasMany(UserRoles, { as: "userroles", foreignKey: "Role_Id"});
  Profile.belongsTo(User, { as: "User", foreignKey: "User_Id"});
  User.hasMany(Profile, { as: "profiles", foreignKey: "User_Id"});
  UserRoles.belongsTo(User, { as: "User", foreignKey: "User_Id"});
  User.hasMany(UserRoles, { as: "userroles", foreignKey: "User_Id"});

  return {
    Profile,
    Role,
    User,
    UserRoles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
