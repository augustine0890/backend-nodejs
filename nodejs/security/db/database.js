const config = require('../config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  config.Database.Database,
  config.Database.DBuserID,
  config.Database.DBUserPassword, {
    host: config.Database.DBServer,
    dialect: 'mysql',
  }
);

var initModels = require('../models/init-models');
var models = initModels(sequelize);

module.exports = {
  models: models,
  sequelize: sequelize,
  Sequelize: Sequelize,
};