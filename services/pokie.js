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
        if (result_str.length !== pattern.length) {
            return false;
        }

        for (let i = 0; i < result_str.length; i++) {
            if (pattern[i] !== '*' && result_str[i] !== pattern[i]) {
                return false;
            }
        }
        return true;
    }

    matches_unordered(result_str, pattern) {
        const result_symbols = result_str.split('');
        const pattern_symbols = pattern.split('').filter(c => c !== '*');

        if (result_symbols.length !== result_str.split('').length) {
            return false;
        }

        // Count occurrences of each symbol in both
        const result_counts = {};
        const pattern_counts = {};

        for (let symbol of result_symbols) {
            result_counts[symbol] = (result_counts[symbol] || 0) + 1;
        }

        for (let symbol of pattern_symbols) {
            pattern_counts[symbol] = (pattern_counts[symbol] || 0) + 1;
        }

        // Check if result contains at least the required symbols from pattern
        for (let symbol in pattern_counts) {
            if ((result_counts[symbol] || 0) < pattern_counts[symbol]) {
                return false;
            }
        }

        return true;
    }




}

module.exports = Pokie_Machine;