class Pokie_Machine {
    constructor(reel_symbols, reel_probabilities, payout_table, number_of_reels) {
        this.reel_symbols = reel_symbols;
        this.reel_probabilities = reel_probabilities;
        this.payout_table = payout_table;
        this.number_of_reels = number_of_reels;
    }

    spin() {
        let result = [];
        for (let i = 0; i < this.number_of_reels; i++) {
            let symbol = this.get_random_symbol(this.reel_symbols, this.reel_probabilities);
            result.push(symbol);
        }
        return result;
    }

    get_random_symbol(symbols, probabilities) {
        let random = Math.random();
        let cumulative_probability = 0;
        for (let i = 0; i < symbols.length; i++) {
            cumulative_probability += probabilities[i];
            if (random < cumulative_probability) {
                return symbols[i];
            }
        }
        return symbols[symbols.length - 1];
    }

    calculate_payout(result) {
        let payout = 0;
        const result_str = result.join('');

        for (let combination in this.payout_table) {
            if (combination.startsWith('~')) {
                // Order-independent matching
                if (this.matches_unordered(result_str, combination.slice(1))) {
                    payout += this.payout_table[combination];
                }
            } else if (this.matches_pattern(result_str, combination)) {
                // Exact or position-based wildcard matching
                payout += this.payout_table[combination];
            }
        }
        return payout;
    }

    matches_pattern(result_str, pattern) {
        const result_arr = [...result_str];
        const pattern_arr = [...pattern];
        if (result_arr.length !== pattern_arr.length) return false;
        return pattern_arr.every((char, i) => char === '*' || result_arr[i] === char);
    }

    matches_unordered(result_str, pattern) {
        const count = (str) => {
            const map = {};
            for (let symbol of str.split('')) {
                if (symbol !== '*') map[symbol] = (map[symbol] || 0) + 1;
            }
            return map;
        };

        const result_counts = count(result_str);
        const pattern_counts = count(pattern);

        return Object.entries(pattern_counts).every(
            ([symbol, count]) => (result_counts[symbol] || 0) >= count
        );
    }




}

module.exports = Pokie_Machine;