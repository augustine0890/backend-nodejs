const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Username: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    PasswordHash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Salt: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    EmailConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    MobilePhone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    MobilePhoneConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    TwoFactorEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    AccessFailedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    LockoutEnd: {
      type: DataTypes.DATE,
      allowNull: true
    },
    LockoutEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'User',
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
    ]
  });
};
