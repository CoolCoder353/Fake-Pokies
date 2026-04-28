const express = require("express");

const User = require('./classes/user');
const Database = require("./services/database")
const Pokie_Machine = require("./services/pokie");

const app = express();

let db = new Database("database.json");
db.load_users();
db.reset_database();

let reel_symbols = ["❤️", "🍒", "🍋", "🔔", "⭐"];

let reel_probabilities = [0.4, 0.3, 0.2, 0.08, 0.02];

let payout_table = {
    "❤️❤️❤️": 100,
    "🍒🍒🍒": 50,
    "🍋🍋🍋": 20,
    "🔔🔔🔔": 10,
    "~❤️**": 5
};

let pokie_machine = new Pokie_Machine(reel_symbols, reel_probabilities, payout_table, 3);


let reel = pokie_machine.spin();
let payout = pokie_machine.calculate_payout(reel);
console.log(reel.join(''));
console.log(payout);





