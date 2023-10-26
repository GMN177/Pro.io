const {
    assign
} = require('xstate');

const toMatchService = require('../connectors/toMatchService');

const toUserService = require('../connectors/toUserService');

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

const setWinnerForDisconnect = assign({
    winner: (context, event) => context.players.indexOf(event.value)
});

const handleDisconnectWhilePlaying = assign({
    currentPlayer: (context, event) => context.players[0] === event.value ? 0 : 1
});

const saveGame = async (context) => {
    console.log('saving game:', context);

    let body = {
        endTime: new Date().toString(),
        winner: context.players[context.winner],
        winnerScore: 1,
        loserScore: 0
    };

    await toMatchService.endMatch(context.matchId, body);

    await toUserService.updateStats(context.players[0], context.winner === 0);

    await toUserService.updateStats(context.players[1], context.winner === 1);
}

module.exports = {
    addPlayer,
    updateBoard,
    setWinner,
    setWinnerForDisconnect,
    handleDisconnectWhilePlaying,
    saveGame
};