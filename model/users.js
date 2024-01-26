const Sequelize = require("sequelize")
const seqConn = require("./conn")


const User = seqConn.define('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
    reg_otp:{
        type: Sequelize.STRING,
        allowNull:true
    }
    }, {
      timestamps: false
    });

User.sync({})

module.exports = User