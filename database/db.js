const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect:process.env.DB_DIALECT,
  host: 'localhost',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: false,
});

module.exports = { db };