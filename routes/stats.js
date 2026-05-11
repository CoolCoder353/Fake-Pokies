const express = require('express');
const recentPayouts = require('../services/recent_payouts');


module.exports = (db) => {
    const router = express.Router();

    router.get('/recent-payouts', (req, res) => {
        return res.json(recentPayouts.getRecentPayouts(20));
    });

    router.get('/global-stats', (req, res) => {
        let users = db.get_all_users();
        let totalUsers = users.length;
        let totalSpins = 0;
        let totalWon = 0;
        let totalLost = 0;

        users.forEach(user => {
            totalSpins += user.times_spun();
            totalWon += user.wins();
            totalLost += user.losses();
        });
        return res.json({ totalUsers: totalUsers, totalSpins: totalSpins, totalWon: totalWon, totalLost: totalLost });
    });

    return router;
};
