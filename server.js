const express = require("express");

const User = require('./classes/user');
const Database = require("./services/database")
const Pokie_Machine = require("./services/pokie");


let machine_list = [];
let machine_symbols = ['❤️', '🌟', '🥑', '🔔', '💰'];
let machine_probabilities = [0.54, 0.3, 0.1, 0.05, 0.01];
let machine_payout_table = {
    "~🔔**": 0.40,
    "~💰**": 0.80,
    "❤️❤️❤️": 1,
    "🌟🌟🌟": 2,
    "🥑🥑🥑": 10,
    "🔔🔔🔔": 50,
    "💰💰💰": 100,
};

machine_list.push(new Pokie_Machine(machine_symbols, machine_probabilities, machine_payout_table, 3));

const app = express();

let db = new Database("database.json");
db.load_users();

////db.reset_database();

app.use(express.json());
app.use(express.static('public'));
app.use("/auth", require("./routes/auth")(db));
app.use("/pokie", require("./routes/pokie")(db, machine_list));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
