const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/firstapi');

// artenativly
// const sequelize = new Sequelize('firstapi', 'root', 'root', {
//     host: 'localhost',
//     dialect: 'mysql'
//   });

module.exports = sequelize;