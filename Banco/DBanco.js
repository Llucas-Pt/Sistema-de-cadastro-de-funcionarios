const { Sequelize } = require("sequelize");

const DBanco = new Sequelize('Cadastro', 'root', 'senh@987654321', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = DBanco;