const {
    createMachine,
    assign
} = require('xstate');

const {
    checkGameReady,
    checkWin,
    checkDraw,
    isValidMove,
    playerNotInGame,
    checkForfeit,
    checkCancelled
} = require('./gameGuards');

const {
    addPlayer,
    updateBoard,
    setWinner,
    setWinnerForDisconnect,
    handleDisconnectWhilePlaying,
    saveGame
} = require('./gameActions');


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
                    target: "disconnected"
                }
            }
        },
        'playing': {
            always: [{
                    target: "win",
                    cond: "checkWin",
                    actions: "setWinner"
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
                    target: "disconnected"
                }
            }
        },
        "disconnected": {
            always: [{
                    target: "win",
                    cond: "checkForfeit",
                    actions: "setWinnerForDisconnect"
                },
                {
                    target: "cancelled",
                    cond: "checkCancelled"
                }
            ]
        },
        "win": {
            onEntry: "saveGame",
            type: "final",
        },
        "draw": {
            onEntry: "saveGame",
            type: "final"
        },
        "cancelled": {
            onEntry: "saveGame",
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
}, {
    actions: {
        addPlayer,
        updateBoard,
        resetGame: assign(initialContext),
        setWinner,
        setWinnerForDisconnect,
        handleDisconnectWhilePlaying,
        saveGame
    },
    guards: {
        checkGameReady,
        checkWin,
        checkDraw,
        isValidMove,
        playerNotInGame,
        checkForfeit,
        checkCancelled
    }
});

gameStates.withContext(initialContext);

module.exports = {
    initialContext,
    gameStates
};