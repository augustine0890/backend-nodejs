const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Profile', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FullName: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    LastAccess: {
      type: DataTypes.DATE,
      allowNull: false
    },
    User_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'Profile',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "fk_Profile_User_idx",
        using: "BTREE",
        fields: [
          { name: "User_Id" },
        ]
      },
    ]
  });
};
