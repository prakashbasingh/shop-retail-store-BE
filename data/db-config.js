require("dotenv").config();
const knex = require("knex");
const dbEnvironment = process.env.NODE_ENV || "development";
const knexConfig = require("../knexfile.js")[dbEnvironment];
module.exports = knex(knexConfig);
