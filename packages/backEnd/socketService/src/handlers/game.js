const {
    createMachine,
    assign
} = require('xstate');

const { checkGameReady, checkWin, checkDraw, isValidMove, saveGame } = require('../utils');


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

module.exports = {
    initialContext,
    gameStates
};