const Sequelize = require('sequelize');

const sequelize = new Sequelize('gamerdou', 'gamerdou_username', 'gamerdou_password', {
    host: '127.0.0.1',
    dialect: 'postgres',
});

module.exports = sequelize;
