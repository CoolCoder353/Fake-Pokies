const express = require('express');



module.exports = (db) => {
    const router = express.Router();

    router.get('/users', (req, res) => {
        let users = db.get_all_users();
        console.log("Admin accessed user list, sending " + users.length + " users");
        return res.json(users.map(user => user.serialize()));
    });

    router.put('/users/:id', (req, res) => {
        let user = db.find_user_by_id(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (req.body.coins !== undefined) {
            user.inital_cash = req.body.coins;
        }
        else {
            return res.status(400).json({ error: "Coins field is required" });
        }


        console.log("Admin updated user " + user.username + " coins to " + user.coins);
        db
        db.save_users();
        return res.json({ message: "User updated successfully", user: user.serialize() });
    });

    router.delete('/users/:id', (req, res) => {
        let user = db.find_user_by_id(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        db.users = db.users.filter(u => u.id != req.params.id);
        db.save_users();
        return res.json({ message: "User deleted successfully" });
    });

    router.get('/stats', (req, res) => {
        let users = db.get_all_users();
        let totalSpins = 0;
        let totalWon = 0;
        let totalCoints = 0;
        let totalLost = 0;

        users.forEach(user => {
            totalSpins += user.times_spun();
            totalWon += user.wins();
            totalCoints += user.cash();
            totalLost += user.losses();
            console.log("User " + user.username + " has " + user.times_spun() + " spins, won " + user.wins() + ", lost " + user.losses() + ", and has " + user.cash() + " coins");
        });
        return res.json({ totalUsers: users.length, totalSpins: totalSpins, totalWon: totalWon, totalCoins: totalCoints, totalLost: totalLost });
    });

    return router;
};