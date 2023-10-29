const {
    assign
} = require('xstate');

const toMatchService = require('../connectors/toMatchService');

const toUserService = require('../connectors/toUserService');
const logger = require('../utils/logger');

const addPlayer = assign({
    players: (context, event) => {
        return [...context.players, event.value];
    }
});

const startGame = assign({
    currentX: () => Math.round(Math.random() * 25),
    currentY: () => Math.round(Math.random() * 25),
    scores: (context, event) => {
        let scores = {};
        scores[context.players[0]] = 0;
        scores[context.players[1]] = 0;
        return scores;
    }
});

const updateBoard = assign({
    currentX: () => Math.round(Math.random() * 25),
    currentY: () => Math.round(Math.random() * 25),
    scores: (context, event) => {
        let updatedScores = JSON.parse(JSON.stringify(context.scores));
        updatedScores[event.player] += 1;
        return updatedScores;
    }
});

const setWinner = assign({
    winner: context => context.scores[context.players[0]] > context.scores[context.players[1]] ? 0 : 1
});

const setWinnerForDisconnect = assign({
    winner: (context, event) => context.players[0] === event.value ? 1 : 0
});

const saveGame = async (context) => {
    logger.info("saving game:" + JSON.stringify(context));

    let body = {
        endTime: new Date().toString(),
        winner: context.players[context.winner],
        winnerScore: context.scores[context.players[context.winner]],
        loserScore: context.scores[context.players[context.winner === 0 ? 1 : 0]]
    };

    await toMatchService.endMatch(context.matchId, body);

    await toUserService.updateStats(context.players[0], context.winner === 0);

    await toUserService.updateStats(context.players[1], context.winner === 1);
}

module.exports = {
    addPlayer,
    startGame,
    updateBoard,
    setWinner,
    setWinnerForDisconnect,
    saveGame
};