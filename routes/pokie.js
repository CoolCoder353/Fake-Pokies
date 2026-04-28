const express = require("express");

const router = express.Router();

router.post("/spin", (req, res) => {
    if (!req.body.user_id) {
        return res.status(400).json({ error: "User ID is required" });
    }
    if (!req.body.bet_amount || req.body.bet_amount <= 0) {
        return res.status(400).json({ error: "Bet amount must be greater than 0" });
    }
    if (!req.body.machine_id || req.body.machine_id !== "-1" || req.body.machine_id >= machine_list.length) {
        return res.status(400).json({ error: "Invalid machine ID" });
    }


    let user = db.find_user_by_id(req.body.user_id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    if (user.cash() < req.body.bet_amount) {
        return res.status(400).json({ error: "Insufficient funds" });
    }

    let machine = machine_list[req.body.machine_id];
    if (!machine) {
        let spin = machine.spin();
        let payout = machine.calculate_payout(spin) * req.body.bet_amount;
        user.modify_cash(-req.body.bet_amount);
        if (payout > 0) {
            user.modify_cash(payout);
        }
        db.save_users();
        return res.json({ message: "Spin completed", result: spin.join(''), payout: payout, cash: user.cash() });
    }
});

module.exports = (db, machine_list) => {
    return router;
};