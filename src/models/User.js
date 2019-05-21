const Sequelize = require('sequelize');
const sequelize = require('../config/db');

class User extends Sequelize.Model {}
User.init({
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING
}, { sequelize, modelName: 'user' });

module.exports = User;