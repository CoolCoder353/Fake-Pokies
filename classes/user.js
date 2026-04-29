const bcrypt = require('bcrypt');
class User {

    constructor(id, username, inital_cash, hashed_password = null) {
        this.id = id;
        this.username = username;
        this.inital_cash = inital_cash;
        this.hashed_password = hashed_password;
    }

    static deserialize(user_string) {
        let user_data = JSON.parse(user_string);

        return new User(user_data.id, user_data.username, user_data.inital_cash, user_data.hashed_password);

    }

    serialize() {
        return {
            id: this.id,
            username: this.username,
            cash: this.inital_cash
        };
    }

    cash() {
        return this.inital_cash;
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
}

module.exports = User;