export function byMe(a, b) {
    const areMe = function (participant) {
        return participant.stats.playerId == 'account.16fce02e0bf9498d96ab307bcb8009e3';
    };

    if (a.participants.some(areMe)) {
        return -1;
    }

    if (b.participants.some(areMe)) {
        return 1;
    }

    return 0;
};

export function byRank(a, b) {
    if (a.stats.rank > b.stats.rank) {
        return 1;
    }

    if (a.stats.rank < b.stats.rank) {
        return -1;
    }

    return 0;
};

export function byMeThenRank(a, b) {
    return byMe(a, b) || byRank(a, b);
};
