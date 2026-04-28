const fs = require("fs");

class Database {

    load_users() {
        const data = JSON.parse(fs.readFileSync(this.file_path, 'utf8'));
        this.users = data.users;
    }


    constructor(file_path) {
        this.file_path = file_path;
    }



    save_users() {
        const data = { users: this.users };
        fs.writeFileSync(this.file_path, JSON.stringify(data))
    }

    reset_database() {
        this.users = [];
        this.save_users();
    }

    find_user_by_id(id) {
        for (let index in this.users) {
            if (this.users[index].id == id) {
                return this.users[index];
            }
        }
        return false;
    }

    find_user_by_username(username) {
        for (let index in this.users) {
            if (this.users[index].username == username) {
                return this.users[index];
            }
        }
        return false;
    }

    login_user(username, password) {
        let user = this.find_user_by_username(username);
        if (user) {
            if (user.validate_password(password)) {
                return user;
            }
        }
        return false;
    }

    register_user(username, password) {
        if (this.find_user_by_username(username)) {
            return false;
        }
        let new_user = new User(this.users.length + 1, username, 1000);
        new_user.set_password(password);
        this.create_user(new_user);
        return new_user;
    }

    create_user(user) {
        this.users.push(user);
        this.save_users()
    }
}




module.exports = Database;