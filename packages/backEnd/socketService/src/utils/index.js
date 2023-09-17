const {
    interpret
} = require('xstate');

function checkGameReady(context, event) {
    return context.players.length === 2;
};

function checkWin(context, event) {
    let cells = context.cells;
    const positions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const isRowComplete = (row) => {
        const symbols = row.map((i) => cells[i]);
        return symbols.every((i) => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some((i) => i === true);
};

function checkDraw(context, event) {
    let cells = context.cells;
    return cells.filter((c) => c === null).length === 0;
};

function isValidMove(context, event) {
    return context.players[context.currentPlayer] == event.player && context.cells[event.value] === null;
};

function sendEventAndEmitNewState(io, gameStates, event, match) {
    gameStates.withContext(match.context);

    const gameStateService = interpret(gameStates)
        .onTransition((state) => console.log(state.value, state.context))
        .start();

    if (event) {
        gameStateService.send(event);
    }

    match.context = gameStateService.getSnapshot().context;

    io.to(match.id).emit("newState", {
        state: gameStateService.getSnapshot(),
        stateValue: gameStateService.getSnapshot().value,
        stateContext: gameStateService.getSnapshot().context,
        nextEvents: gameStateService.getSnapshot().machine.states[gameStateService.getSnapshot().value].events
    });
}

module.exports = {
    checkGameReady,
    checkWin,
    checkDraw,
    isValidMove,
    sendEventAndEmitNewState
};