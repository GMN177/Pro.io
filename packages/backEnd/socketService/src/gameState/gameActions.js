const {
    assign
} = require('xstate');

const {
    getMatch,
    updateMatch
} = require('../connectors/toMatchService');

const addPlayer = assign({
    players: (context, event) => {
        return [...context.players, event.value];
    }
});

const updateBoard = assign({
    cells: (context, event) => {
        const updatedBoard = [...context.cells];
        updatedBoard[event.value] = context.currentPlayer;
        return updatedBoard;
    },
    currentPlayer: (context, event) => context.players[0] === event.player ? 1 : 0
});

const setWinner = assign({
    winner: context => context.currentPlayer === 0 ? 1 : 0
});

const handleDisconnectWhilePlaying = assign({
    currentPlayer: (context, event) => context.players[0] === event.value ? 0 : 1
});

const saveGame = (context) => {
    console.log('saving game:', context);

    let match = getMatch(context.matchId);

    console.log('match pre-update:', match);

    match.endTime = new Date();
    match.duration = match.endTime - match.startTime;
    match.status = "FINISHED";

    console.log('match post-update:', match);

    let result = updateMatch(context.matchId, match);

    console.log('save result:', result);
}

module.exports = {
    addPlayer,
    updateBoard,
    setWinner,
    handleDisconnectWhilePlaying,
    saveGame
};