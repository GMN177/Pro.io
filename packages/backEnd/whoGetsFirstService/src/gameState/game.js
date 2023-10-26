const {
    createMachine,
    assign
} = require('xstate');

const {
    checkGameReady,
    checkWin,
    isValidMove,
    playerNotInGame
} = require('./gameGuards');

const {
    addPlayer,
    startGame,
    updateBoard,
    setWinner,
    setWinnerForDisconnect,
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
                SURRENDER: {
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
                SURRENDER: {
                    target: "win",
                    actions: "setWinnerForDisconnect"
                }
            }
        },
        "win": {
            onEntry: "saveGame",
            type: "final",
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
        setWinnerForDisconnect,
        handleDisconnectWhilePlaying,
        saveGame
    },
    guards: {
        checkGameReady,
        checkWin,
        isValidMove,
        playerNotInGame
    }
});

gameStates.withContext(initialContext);

module.exports = {
    initialContext,
    gameStates
};