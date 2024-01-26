const { Sequelize } = require('sequelize');

const database = 'utilityui';
const username = 'admin';
const password = 'g5tL8RD6aEER1QPI1PtIQ1WftTZm2j3e';
const host = "dpg-cmp48qol5elc73fmi9l0-a.oregon-postgres.render.com"



// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: 'postgres',
//   ssl: dis
// });

const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:5432/${database}?ssl=true`)

sequelize.authenticate().then(() => {
console.log('Connection has been established successfully.');
}).catch(err => {
console.error('Unable to connect to the database:', err);

});

module.exports =  sequelize