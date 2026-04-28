const express = require("express");

const User = require('./classes/user');
const Database = require("./services/database")
const Pokie_Machine = require("./services/pokie");

const app = express();

let db = new Database("database.json");
db.load_users();

////db.reset_database();


