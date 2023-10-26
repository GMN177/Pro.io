const {
    interpret
} = require('xstate');
const logger = require('../utils/logger');
const {
    gameStates
} = require('../gameState/game.js');

function sendEventAndEmitNewState(io, event, match) {
    const gameStateService = interpret(gameStates)
        .onTransition((state) => {
            match.state = JSON.stringify(state);
        })
        .start(JSON.parse(match.state));

    if (event !== null) {
        console.log('sending event:', event);
        gameStateService.send(event);
    }

    logger.info("Sending new state : " + gameStateService.getSnapshot().value + " to matchId: " + match.id);

    io.to(match.id).emit("newState", {
        state: gameStateService.getSnapshot(),
        stateValue: gameStateService.getSnapshot().value,
        stateContext: gameStateService.getSnapshot().context,
        nextEvents: gameStateService.getSnapshot().machine.states[gameStateService.getSnapshot().value].events
    });
}

module.exports = {
    sendEventAndEmitNewState
};