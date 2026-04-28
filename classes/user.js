const bcrypt = require('bcrypt');
class User {

    constructor(id, username, inital_cash) {
        this.id = id;
        this.username = username;
        this.inital_cash = inital_cash;
    }

    static deserialize(user_string) {
        let user_data = JSON.parse(user_string);

        return new User(user_data.id, user_data.username, user_data.hashed_password, user_data.inital_cash);

    }



    serialize() {
        return JSON.stringify(this)
    }

    cash() {
        return this.inital_cash;
    }

    modify_cash(modify_amount) {
        this.inital_cash += modify_amount;
    }

    set_password(password) {
        this.hashed_password = bcrypt.hashSync(password, 10);
    }

    validate_password(password) {
        return bcrypt.compare(password, this.hashed_password);

    }
}

module.exports = User;