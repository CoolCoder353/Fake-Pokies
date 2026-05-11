const fs = require("fs");
const DB_PATH = "payouts.json";
const MAX_PAYOUTS = 50;

function loadPayouts() {
    try {
        const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        data.payouts.sort(() => Math.random() - 0.5);

        return data.payouts || [];
    } catch (e) {
        console.error("Failed to load payouts:", e);
        return [];
    }

}

function savePayouts(payouts) {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify({ payouts: payouts }));
    } catch (e) {
        console.error("Failed to save payouts:", e);
    }
}

function addPayout(username, amount) {
    let payouts = loadPayouts();
    payouts.unshift({
        username: username,
        amount: amount,
        timestamp: Date.now()
    });
    if (payouts.length > MAX_PAYOUTS) {
        payouts = payouts.slice(0, MAX_PAYOUTS);
    }
    savePayouts(payouts);
}

function getRecentPayouts(limit = 20) {
    return loadPayouts().slice(0, limit).sort(() => Math.random() - 0.5);
}

module.exports = { addPayout, getRecentPayouts };