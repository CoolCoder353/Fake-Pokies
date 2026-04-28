const express = require("express");

const User = require('./classes/user');
const Database = require("./services/database")
const Pokie_Machine = require("./services/pokie");


let machine_list = [];
const app = express();

let db = new Database("database.json");
db.load_users();

////db.reset_database();

app.use(express.json());
app.use("/auth", require("./routes/auth")(db));
app.use("/pokie", require("./routes/pokie")(db, machine_list));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
