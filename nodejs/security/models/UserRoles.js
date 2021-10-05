const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserRoles', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    Role_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Role',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'UserRoles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
          { name: "User_Id" },
          { name: "Role_Id" },
        ]
      },
      {
        name: "fk_UserRoles_User1_idx",
        using: "BTREE",
        fields: [
          { name: "User_Id" },
        ]
      },
      {
        name: "fk_UserRoles_Role1_idx",
        using: "BTREE",
        fields: [
          { name: "Role_Id" },
        ]
      },
    ]
  });
};
