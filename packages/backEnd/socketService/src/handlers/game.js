const {
    createMachine,
    assign
} = require('xstate');
const {
    getMatch,
    updateMatch
} = require('../connectors/toMatchService');

//const { checkGameReady, checkWin, checkDraw, isValidMove, saveGame } = require('../utils');


const initialContext = {
    cells: Array(9).fill(null),
    players: [],
    currentPlayer: 0,
    winner: null,
    matchId: null
};

const gameStates = createMachine({
        initial: 'lobby',
        states: {
            'lobby': {
                always: [{
                    target: 'playing',
                    cond: "checkGameReady"
                }],
                on: {
                    READY: {
                        cond: "playerNotInGame",
                        actions: "addPlayer",
                        target: 'lobby'
                    },
                    DISCONNECT: {
                        target: "cancelled"
                    }
                }
            },
            'playing': {
                always: [{
                        target: "win",
                        cond: "checkWin"
                    },
                    {
                        target: "draw",
                        cond: "checkDraw"
                    }
                ],
                on: {
                    PLAY: {
                        target: "playing",
                        cond: "isValidMove",
                        actions: "updateBoard"
                    },
                    DISCONNECT: {
                        target: "win",
                        actions: "handleDisconnectWhilePlaying"
                    }
                }
            },
            "win": {
                onEntry: "setWinner",
                always: {
                    target: 'gameSaved',
                    action: "saveGame"
                }
            },
            "draw": {
                always: {
                    target: 'gameSaved',
                    action: "saveGame"
                }
            },
            "cancelled": {
                always: {
                    target: 'gameSaved',
                    action: "saveGame"
                }
            },
            "gameSaved": {
                type: "final"
            }
        },
        on: {
            RESET: {
                target: "lobby",
                actions: "resetGame"
            }
    },
    context: initialContext,
    predictableActionArguments: true,
    preserveActionOrder: true,
    },
    {
    actions: {
        addPlayer: assign({
            players: (ctx, e) => [...ctx.players, e.value]
        }),
        updateBoard: assign({
            cells: (ctx, e) => {
                const updatedBoard = [...ctx.cells];
                updatedBoard[e.value] = ctx.currentPlayer;
                return updatedBoard;
            },
            currentPlayer: (ctx, e) => ctx.players[0] === e.player ? 1 : 0
        }),
        resetGame: assign(initialContext),
        setWinner: assign({
            winner: ctx => ctx.currentPlayer === 0 ? 1 : 0
        }),
        handleDisconnectWhilePlaying: assign({
            currentPlayer: (ctx, e) => ctx.players[0] === e.value ? 0 : 1
        }),
        saveGame: (ctx, e) => {
            console.log('saving game:', ctx);
            saveGame(ctx);
        }
    },
    guards: {
        checkGameReady,
        checkWin,
        checkDraw,
        isValidMove,
        playerNotInGame: (ctx, e) => ctx.players.indexOf(e.value) === -1
    }
    }
);

gameStates.withContext(initialContext);

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

function saveGame(context) {
    console.log('saving game:', context);

    let match = getMatch(context.matchId);

    match.endTime = new Date();
    match.duration = match.endTime - match.startTime;
    match.status = "FINISHED";


    updateMatch(context.matchId, {
        state: JSON.stringify(context)
    });
}

module.exports = {
    initialContext,
    gameStates
};