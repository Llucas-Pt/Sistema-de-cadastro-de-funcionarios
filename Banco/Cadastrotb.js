const {DataTypes} = require('sequelize')
const DBanco = require ("./DBanco")

const Cadastrotb = DBanco.define('Cadastro' , {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },

    Nome: {
        type:DataTypes.STRING,
        allowNull: false
    },

    Sobrenome: {
        type: DataTypes.STRING, 
        allowNull: false 
    },

    Cargo: {
        type: DataTypes.STRING, 
        allowNull: false 
    },

    Email: {
        type: DataTypes.STRING,
        allowNull: false 
    },

    Telefone: {
        type: DataTypes.CHAR(11),
        allowNull: false 
    },

    DataNascimento: {
        type: DataTypes.DATE,
        allowNull: false 
    }

})


module.exports = Cadastrotb