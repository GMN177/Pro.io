const {
    interpret
} = require('xstate');
const {
    gameStates
} = require('../handlers/game.js');



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

    console.log('emitting to:', match.id, 'with state:', gameStateService.getSnapshot().value);

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