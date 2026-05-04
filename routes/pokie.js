const express = require("express");
const Pokie_Machine = require("../services/pokie");


module.exports = (db, machine_list) => {

    const router = express.Router();

    router.post("/spin", (req, res) => {
        if (!req.body.user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        if (!req.body.bet_amount || req.body.bet_amount <= 0) {
            return res.status(400).json({ error: "Bet amount must be greater than 0" });
        }

        let user = db.find_user_by_id(req.body.user_id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.cash() < req.body.bet_amount) {
            return res.status(400).json({ error: "Insufficient funds" });
        }
        let machine = machine_list[0]; // For simplicity, we use the first machine. This can be extended to allow multiple machines.
        let spin = machine.spin();
        let payout = Math.round(machine.calculate_payout(spin) * req.body.bet_amount * 100) / 100; // Round payout to 2 decimal places

        user.modify_cash(-req.body.bet_amount);

        user.lost += parseFloat(req.body.bet_amount);
        user.won += parseFloat(payout);
        user.spins += 1;


        if (payout > 0) {
            user.modify_cash(payout);
        }
        db.save_users();

        serialized_spin = [];
        for (let index in spin) {
            serialized_spin.push(machine.reel_symbols.indexOf(spin[index]));
        }

        return res.json({ message: "Spin completed", result: serialized_spin, payout: payout, cash: user.cash() });
    });


    router.get("/userStats/:id", (req, res) => {
        let user = db.find_user_by_id(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.json({
            spins: user.times_spun(),
            won: user.wins(),
            lost: user.losses(),
            cash: user.cash()
        });
    })

    return router;
};