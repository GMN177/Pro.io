const {
    createMachine,
    assign
} = require('xstate');

const {
    checkGameReady,
    checkWin,
    checkDraw,
    isValidMove,
    playerNotInGame
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
                SURRENDER: {
                    target: "win",
                    actions: "setWinnerForDisconnect"
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
                SURRENDER: {
                    target: "win",
                    actions: "setWinnerForDisconnect"
                }
            }
        },
        "win": {
            onEntry: "saveGame",
            type: "final",
        },
        "draw": {
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
        playerNotInGame
    }
});

gameStates.withContext(initialContext);

module.exports = {
    initialContext,
    gameStates
};