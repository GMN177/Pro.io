const {
    createMachine,
    assign
} = require('xstate');

const {
    checkGameReady,
    checkWin,
    isValidMove,
    playerNotInGame,
    checkForfeit,
    checkCancelled
} = require('./gameGuards');

const {
    addPlayer,
    startGame,
    updateBoard,
    setWinner,
    handleDisconnectWhilePlaying,
    saveGame
} = require('./gameActions');


const initialContext = {
    currentX: null,
    currentY: null,
    scores: {},
    players: [],
    winner: null,
    matchId: null
};

const gameStates = createMachine({
    initial: 'lobby',
    states: {
        'lobby': {
            always: [{
                target: 'playing',
                cond: "checkGameReady",
                actions: "startGame"
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
                    cond: "checkForfeit"
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
        startGame,
        updateBoard,
        resetGame: assign(initialContext),
        setWinner,
        handleDisconnectWhilePlaying,
        saveGame
    },
    guards: {
        checkGameReady,
        checkWin,
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