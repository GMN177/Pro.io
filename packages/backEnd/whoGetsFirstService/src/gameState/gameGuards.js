function checkGameReady(context, event) {
    return context.players.length === 2;
};

function checkWin(context, event) {
    return context.scores[context.players[0]] === 5 || context.scores[context.players[1]] === 5;
};

function isValidMove(context, event) {
    return context.currentX === event.x && context.currentY === event.y;
};

function playerNotInGame(context, event) {
    return !context.players.includes(event.value);
};

function checkForfeit(context, event) {
    return context.players.length === 2 && context.players.includes(event.value);
}

function checkCancelled(context, event) {
    return context.players.length === 1 && context.players.includes(event.value);
}

module.exports = {
    checkGameReady,
    checkWin,
    isValidMove,
    playerNotInGame,
    checkForfeit,
    checkCancelled
};