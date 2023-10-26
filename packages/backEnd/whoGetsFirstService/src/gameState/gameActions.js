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

const handleDisconnectWhilePlaying = assign({
    currentPlayer: (context, event) => context.players[0] === event.value ? 0 : 1
});

const saveGame = async (context) => {
    console.log('saving game:', context);

    let endTime = new Date();

    let match = await getMatch(context.matchId);

    console.log('match pre-update:', match);

    match.endTime = endTime.toString();
    match.duration = new Date(endTime - Date(match.startTime)).getMinutes();
    match.status = "FINISHED";

    console.log('match post-update:', match);

    let result = await updateMatch(context.matchId, match);

    console.log('save result:', result);
}

module.exports = {
    addPlayer,
    startGame,
    updateBoard,
    setWinner,
    handleDisconnectWhilePlaying,
    saveGame
};