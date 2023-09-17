const {
    createMachine,
    interpret,
    assign
} = require('xstate');

const { checkGameReady, checkWin, checkDraw, isValidMove } = require('../utils');


const initialContext = {
    cells: Array(9).fill(null),
    players: [],
    currentPlayer: 0,
    winner: null
};

const gameStates = createMachine({
        initial: 'setup',
        states: {
            'setup': {
                always: [{
                    target: 'playing',
                    cond: "checkGameReady"
                }],
                on: {
                    READY: {
                        cond: "playernotingame",
                        actions: "addPlayer",
                        target: 'setup'
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
                    PLAY: [{
                        target: "playing",
                        cond: "isValidMove",
                        actions: "updateBoard"
                    }]
                }
            },
            "win": {
                onEntry: "setWinner"
            },
            "draw": {}
        },
        on: {
            RESET: {
                target: "setup",
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
        })
    },
    guards: {
        checkGameReady,
        checkWin,
        checkDraw,
        isValidMove,
        playernotingame: (ctx, e) => ctx.players.indexOf(e.value) === -1
    }
    }
);

gameStates.withContext(initialContext);

const gameStateService = interpret(gameStates)
    .onTransition((state) => console.log(state.value, state.context))
    .start();

module.exports = {
    gameStateService
};