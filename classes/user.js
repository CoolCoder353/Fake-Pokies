const bcrypt = require('bcrypt');
class User {

    constructor(id, username, inital_cash, hashed_password = null, isAdmin = false, lost = 0, won = 0, spins = 0) {
        this.id = id;
        this.username = username;
        this.inital_cash = inital_cash;
        this.hashed_password = hashed_password;
        this.isAdmin = isAdmin;
        this.lost = lost;
        this.won = won;
        this.spins = spins;
    }

    static deserialize(user_string) {

        let user_data = JSON.parse(user_string);
        console.log("Deserializing user: " + JSON.stringify(user_data));
        return new User(user_data.id, user_data.username, user_data.inital_cash, user_data.hashed_password, user_data.isAdmin, user_data.lost, user_data.won, user_data.spins);

    }

    serialize() {
        return {
            id: this.id,
            username: this.username,
            cash: this.inital_cash,
            isAdmin: this.isAdmin,
            lost: this.lost,
            won: this.won,
            spins: this.spins
        };
    }

    cash() {
        return this.inital_cash;
    }

    wins() {
        return this.won;
    }
    losses() {
        return this.lost;
    }
    times_spun() {
        return this.spins;
    }

    modify_cash(modify_amount) {
        this.inital_cash += modify_amount;
        this.inital_cash = Math.round(this.inital_cash * 100) / 100; // Round to 2 decimal places
    }

    set_password(password) {
        this.hashed_password = bcrypt.hashSync(password, 10);
    }

    validate_password(password) {
        return bcrypt.compareSync(password, this.hashed_password);

    }

    set_admin(isAdmin) {
        this.isAdmin = isAdmin;
    }
}

module.exports = User;